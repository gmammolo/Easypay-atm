import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { asyncScheduler, scheduled, Subscription } from 'rxjs';
import { mergeAll, map } from 'rxjs/operators';
import { UtenteType } from 'src/app/core/constants/utente-type.enum';
import { RoutingService } from 'src/app/core/services/routing.service';
import { SelfStore } from 'src/app/core/store/self.store';
import { InfoDialogComponent } from 'src/app/shared/components/info-dialog/info-dialog.component';
import { Utente } from 'src/app/shared/models/utente.model';
import { Conto } from 'src/app/shared/models/conto.model';
import { UtenteService } from 'src/app/core/services/utente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly buttonWidth = '400px';
  readonly buttonHeight = '250px';

  private readonly toastConfig = {
    horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
    verticalPosition: 'top' as MatSnackBarVerticalPosition,
    panelClass: 'toast-warning',
  };

  private subscriptions: Subscription[] = [];

  constructor(
    private routingService: RoutingService,
    private selfStore: SelfStore,
    private utenteService: UtenteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.routingService.updateHeader('Home');
    if (!this.selfStore.email || !this.selfStore.budget) {
      this.subscriptions.push(
        scheduled([
          this.utenteService.getSelfUtente(),
          this.utenteService.getSelfConto(),
        ], asyncScheduler).pipe(
          mergeAll(),
          map((element) => {
            if (this.isSelfCliente(element)) {
              this.selfStore.updateCliente(element as Utente);
            } else if (this.isSelfConto(element)) {
              this.selfStore.updateConto(element as Conto);
            }
          })
        )
        .subscribe(() => this.handleCustomerPermission()));
    } else {
      this.handleCustomerPermission();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  gotoPayment() {
    this.routingService.gotoPayment();
  }

  gotoRecharge() {
    this.routingService.gotoRecharge();
  }

  gotoMovements() {
    this.routingService.gotoMovements();
  }

  /** verifica che il cliente sia un mercante */
  isMercant(): boolean {
    return this.selfStore.type === UtenteType.commerciante;
  }

  getInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * verifica che il login abbia restituito un commerciante, altrimenti blocca l'atm chiedendo un upgrade
   */
  private handleCustomerPermission() {
    if (!this.isMercant()) {
      // warning: che serve un accesso da commerciante
      this.snackBar.open('Per usare l\'ATM è necessario un account da commerciante. Aggiorna il tuo profilo', 'Undo', this.toastConfig);
    }
  }

  /** verifica se l'oggetto passato è un cliente */
  private isSelfCliente(cliente): boolean {
    return cliente && cliente.email;
  }

    /** verifica se l'oggetto passato è un conto */
    private isSelfConto(conto): boolean {
      return conto && conto.budget;
    }
}
