import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UtenteService } from 'src/app/core/services/utente.service';
import { Utente } from '../../models/utente.model';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  /** controller del form */
  formCrl: FormGroup;

  @Output() clientAuthEvent = new EventEmitter<Utente>();

  constructor(
    private fb: FormBuilder,
    private utenteService: UtenteService,
  ) {
    this.formCrl = this.fb.group({
      userId: this.fb.control('', [Validators.required]),
      pin: this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)])
    });
  }

  ngOnInit() {}

  login() {
    this.utenteService.getUtenteByPin(this.formCrl.value.userId, this.formCrl.value.pin).subscribe(
      cliente => this.clientAuthEvent.emit(cliente)
    );
  }
}
