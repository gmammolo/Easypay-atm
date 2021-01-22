import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoutingService } from 'src/app/core/services/routing.service';

import { LoginType } from '../../constants/login-type.enum';
import { Utente } from '../../models/utente.model';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss']
})
export class RecognitionComponent implements OnInit {

  readonly LoginType = LoginType;
  public loginType = LoginType.pin;

  public cliente: Utente = null;

  @Output() authClientStatus = new EventEmitter<Utente>();

  constructor(private routingService: RoutingService) { }

  ngOnInit(): void {
    this.routingService.updateHeader('Login');
  }

  changeLogin(choosenLoginType: LoginType) {
    this.loginType = choosenLoginType;
  }

  authSuccess(cliente: Utente) {
    this.loginType = LoginType.success;
    this.cliente = cliente;
    this.authClientStatus.emit(cliente);
  }
}
