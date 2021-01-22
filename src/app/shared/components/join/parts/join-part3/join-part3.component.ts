import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/core/services/routing.service';
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
export class JoinPart3Component implements OnInit {
  readonly StatusEnum = StatusEnum;

  @Input() data: any;

  status = StatusEnum.waiting;

  constructor(private utenteService: UtenteService, private routingService: RoutingService) { }

  ngOnInit(): void {
    this.utenteService.register(this.data)
    .subscribe({
      next: () => {
        this.status = StatusEnum.success;
        setInterval(() => this.routingService.gotoHome(), 2000);
      },
      error: () => this.status = StatusEnum.failed
    });
  }

}
