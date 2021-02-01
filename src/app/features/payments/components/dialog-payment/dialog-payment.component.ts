import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MovimentoService } from 'src/app/core/services/movimento.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { SelfStore } from 'src/app/core/store/self.store';
import { Utente } from 'src/app/shared/models/utente.model';

import { DialogData } from '../../payments.component';

@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.scss']
})
export class DialogPaymentComponent implements OnDestroy {


  public cliente: Utente;
  public priceInfo: DialogData['priceInfo'];
  
  private subscriptions: Subscription[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogPaymentComponent>,
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

  completePayment() {
    this.subscriptions.push(
      this.movimentoService
        .pagamento(this.cliente.idConto, this.selfStore.idConto, this.priceInfo.price)
        .subscribe(() => {
          // pagamento avvenuto con successo
          this.openSnackBar('pagamento effettuato con successo', 'success');
        },
        (error) => {
          // errore nel pagamento
          this.openSnackBar('pagamento fallito', 'failure');
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
      panelClass: ['paytost', cssClass],
      duration: 10000,
    });
  }
}
