import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RoutingService } from 'src/app/core/services/routing.service';
import { InfoAtmComponent } from 'src/app/shared/info-atm/info-atm.component';

enum FormTypes {
  login = 'Login',
  join = 'Join'
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  readonly FormTypes = FormTypes;


  public formType: FormTypes = FormTypes.login;

  private subscriptions: Subscription[] = [];

  constructor(private routingService: RoutingService, private dialog: MatDialog, ) { }

  ngOnInit(): void {
    this.routingService.updateHeader('Login');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  clickInfo() {
    const dialogRef = this.dialog.open(InfoAtmComponent);
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      }));
  }

  switchForm(formType: FormTypes) {
    this.formType = formType;
  }

}
