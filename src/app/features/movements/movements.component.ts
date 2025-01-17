import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MovimentoType } from 'src/app/core/constants/movimento-type.enum';
import { MovimentoService } from 'src/app/core/services/movimento.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { UtenteService } from 'src/app/core/services/utente.service';
import { SelfStore } from 'src/app/core/store/self.store';
import { Movimento } from 'src/app/shared/models/movimento.model';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit, OnDestroy {
  readonly MovimentoType = MovimentoType;

  displayedColumns: string[] = ['id', 'valore', 'tipo', 'from_name_or_id_atm', 'to_name', 'date'];

  dataSource: Observable<Movimento[]>;

  private subscriptions: Subscription[] = [];

  constructor(
    private movimentoService: MovimentoService,
    public selfStore: SelfStore,
    private routingService: RoutingService,
    private utenteService: UtenteService
  ) { }

  ngOnInit(): void {
    this.routingService.updateHeader('Movimenti');
    this.subscriptions.push(this.utenteService.getSelfConto().subscribe(conto => this.selfStore.updateConto(conto)));
    this.dataSource = this.movimentoService.getMovimenti('self');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /** contrassegna chi riceve i messaggi */
  isReceipt(movimento: Movimento): boolean {
    return movimento.type === MovimentoType.ricarica || movimento.to === this.selfStore.idConto;
  }

  getFromName(movimento: Movimento) {
    if (movimento.type === MovimentoType.ricarica) {
      return 'ATM01';
    }
    if (movimento.to === this.selfStore.id) {
      return movimento.from_name;
    } else {
      return movimento.to_name;
    }
  }

  getToName(movimento: Movimento) {
    if (movimento.to === this.selfStore.id) {
      return movimento.to_name;
    } else {
      return movimento.from_name;
    }
  }

}
