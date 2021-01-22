import { Component, OnInit } from '@angular/core';
import { asyncScheduler, scheduled } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { UtenteType } from 'src/app/core/constants/utente-type.enum';
import { RoutingService } from 'src/app/core/services/routing.service';
import { SelfStore } from 'src/app/core/store/self.store';
import { Utente } from '../../models/utente.model';
import { Conto } from '../../models/conto.model';
import { UtenteService } from 'src/app/core/services/utente.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  constructor(public selfStore: SelfStore, private utenteService: UtenteService, private routingService: RoutingService) { }

  ngOnInit(): void {
    if (!this.selfStore.email || !this.selfStore.budget) {
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
      .subscribe(() => this.handleCustomerPermission());
    }
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
