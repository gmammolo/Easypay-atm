import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NominatimService } from 'src/app/core/services/nominatim.service';
import { isBorn, isOver18, isPhone } from 'src/app/core/utils/custom-validator';
import { Nominatim } from 'src/app/shared/models/nominatim.model';
import { AbstractJoinPartComponent } from '../abstract-join-part/abstract-join-part.component';

@Component({
  selector: 'app-join-part1',
  templateUrl: './join-part1.component.html',
  styleUrls: ['./join-part1.component.scss'],
})
export class JoinPart1Component extends AbstractJoinPartComponent  implements OnInit, OnDestroy {

  addressOptions$: BehaviorSubject<Nominatim[]> = new BehaviorSubject(undefined);

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private nominatimService: NominatimService) {
    super();
    this.formCrl = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      cognome: this.fb.control('', [Validators.required]),
      cf: this.fb.control('', [Validators.required]),
      bornDate: this.fb.control('', [Validators.required, isOver18, isBorn]),
      phone: this.fb.control('', [isPhone]),
      address: this.fb.control('', []),
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
    this.formCrl.controls.address.valueChanges.subscribe(
      (value: string) => {
        if (value) {
          this.subscriptions.push(this.nominatimService.searchAddress(value).subscribe(addresses => this.addressOptions$.next(addresses)));
        }
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getValue() {
    const nominatim = this.addressOptions$.value[0];
    return {
      nome: this.formCrl.controls.nome.value,
      cognome: this.formCrl.controls.cognome.value,
      cf: this.formCrl.controls.cf.value,
      birth_date: this.formCrl.controls.bornDate.value,
      phone: this.formCrl.controls.phone.value,
      address: this.formCrl.controls.address.value,
      // place_id: nominatim.place_id,
      latitude: nominatim.lat,
      longitude: nominatim.lon,
    };
  }
}
