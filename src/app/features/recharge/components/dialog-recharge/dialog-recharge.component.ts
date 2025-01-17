import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MovimentoService } from 'src/app/core/services/movimento.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { SelfStore } from 'src/app/core/store/self.store';
import { DialogData } from 'src/app/features/payments/payments.component';
import { Utente } from 'src/app/shared/models/utente.model';

@Component({
  selector: 'app-dialog-recharge',
  templateUrl: './dialog-recharge.component.html',
  styleUrls: ['./dialog-recharge.component.scss']
})
export class DialogRechargeComponent implements OnDestroy {


  public cliente: Utente;
  public priceInfo: DialogData['priceInfo'];

  private subscriptions: Subscription[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogRechargeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private movimentoService: MovimentoService,
    private selfStore: SelfStore,
    private routingService: RoutingService,
    private snackBar: MatSnackBar,
  ) {
    this.cliente = data.cliente;
    this.priceInfo = data.priceInfo;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  completeRecharge() {
    /** idAtm hardcodato in quanto abbiamo un solo atm per ora */
    const idAtm = '1';
    this.subscriptions.push(
      this.movimentoService
        .ricarica(this.cliente.idConto, idAtm, this.priceInfo.price)
        .subscribe(() => {
          // ricarica avvenuto con successo
          this.openSnackBar('ricarica effettuata con successo', 'success');
        },
        (error) => {
          // errore nel ricarica
          this.openSnackBar('ricarica fallita', 'failure');
          console.error(error);
        },
        // complete
        () => {
          this.dialogRef.close();
          this.routingService.gotoHome();
        }));
  }

  undo() {
    this.dialogRef.close();
    window.location.reload();
  }

  private openSnackBar(message: string, cssClass?: string) {
    this.snackBar.open(message, 'chiudi', {
      // verticalPosition: MatSnackBarVerticalPosition,
      // horizontalPosition: MatSnackBarHorizontalPosition,
      panelClass: ['rechargetost', cssClass],
      // duration: 10000,
    });
  }
}
