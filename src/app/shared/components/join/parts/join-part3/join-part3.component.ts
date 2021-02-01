import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UtenteService } from 'src/app/core/services/utente.service';

enum StatusEnum {
  waiting = 'waiting',
  success = 'success',
  failed = 'failed',
}

@Component({
  selector: 'app-join-part3',
  templateUrl: './join-part3.component.html',
  styleUrls: ['./join-part3.component.scss']
})
export class JoinPart3Component implements OnInit, OnDestroy {
  readonly StatusEnum = StatusEnum;

  @Input() data: any;

  status = StatusEnum.waiting;

  private subscriptions: Subscription[] = [];

  private readonly toastConfig = {
    horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
    verticalPosition: 'top' as MatSnackBarVerticalPosition,
    panelClass: '',
  };

  constructor(private utenteService: UtenteService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.utenteService.register(this.data)
      .subscribe({
        next: () => {
          this.status = StatusEnum.success;
          this.snackBar.open('Account creato correttamente!', 'ok', {...this.toastConfig, panelClass: 'toast-success'});

        },
        error: () => {
          this.snackBar.open('Registrazione fallita!', 'indietro',  {...this.toastConfig, panelClass: 'toast-error'});
          this.status = StatusEnum.failed;
        }
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
