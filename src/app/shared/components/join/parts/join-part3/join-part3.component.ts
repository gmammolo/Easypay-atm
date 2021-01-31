import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class JoinPart3Component implements OnInit, OnDestroy {
  readonly StatusEnum = StatusEnum;

  @Input() data: any;

  status = StatusEnum.waiting;

  private subscriptions: Subscription[] = [];

  constructor(private utenteService: UtenteService, private routingService: RoutingService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.utenteService.register(this.data)
      .subscribe({
        next: () => {
          this.status = StatusEnum.success;
          setInterval(() => this.routingService.gotoHome(), 2000);
        },
        error: () => this.status = StatusEnum.failed
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
