import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimentoService } from 'src/app/core';
import { MovimentoType } from 'src/app/core/constants/movimento-type.enum';
import { RoutingService } from 'src/app/core/services/routing.service';
import { SelfStore } from 'src/app/core/store/self.store';
import { Movimento } from 'src/app/shared/models/movimento.model';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  readonly MovimentoType = MovimentoType;

  displayedColumns: string[] = ['id', 'valore', 'tipo', 'from_name', 'to_name', 'id_atm', 'date'];

  dataSource: Observable<Movimento[]>;

  constructor(private movimentoService: MovimentoService, public selfStore: SelfStore, private routingService: RoutingService) { }

  ngOnInit(): void {
    this.routingService.updateHeader('Movimenti');
    this.dataSource = this.movimentoService.getMovimenti('self');
  }

}
