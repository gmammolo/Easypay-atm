import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { asyncScheduler, forkJoin, scheduled, Subject, Subscription } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { UtenteType } from 'src/app/core/constants/utente-type.enum';
import { RoutingService } from 'src/app/core/services/routing.service';
import { SelfStore } from 'src/app/core/store/self.store';
import { Utente } from 'src/app/shared/models/utente.model';
import { Conto } from 'src/app/shared/models/conto.model';

import { DialogRechargeComponent } from './components/dialog-recharge/dialog-recharge.component';
import { UtenteService } from 'src/app/core/services/utente.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent implements OnInit, AfterViewInit, OnDestroy {

  public a = new Subject<Utente>();
  public b = new Subject<{ price: string; date: string; invoice: string }>();

  private subscriptions: Subscription[] = [];

  constructor(
    private routingService: RoutingService,
    public selfStore: SelfStore,
    private utenteService: UtenteService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
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
    this.completeRecharge();
  }

  ngAfterViewInit() {
    this.routingService.updateHeader('Ricarica');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  authClientStatus(cliente: Utente) {
    this.a.next(cliente);
    this.a.complete();
  }

  payStatus(status: { price: string; date: string; invoice: string }) {
    this.b.next(status);
    this.b.complete();
  }

  completeRecharge() {
    this.subscriptions.push(
      forkJoin({ cliente: this.a, priceInfo: this.b }).subscribe(
        ({ cliente, priceInfo }) => {
          this.dialog.open(DialogRechargeComponent, {
            data: { cliente, priceInfo },
            disableClose: true,
          });
        }
      ));
  }

  /** verifica che il cliente sia un mercante */
  isMercant(): boolean {
    return this.selfStore.type === UtenteType.commerciante;
  }


  /**
   * verifica che il login abbia restituito un commerciante, altrimenti blocca l'atm chiedendo un upgrade
   */
  private handleCustomerPermission() {
    if (!this.isMercant()) {
      this.routingService.gotoHome();
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
