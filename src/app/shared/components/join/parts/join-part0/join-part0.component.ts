import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { haveUppercase, haveLowercase, haveDigit, haveSpace, checkPasswords } from 'src/app/core/utils/custom-validator';
import { AbstractJoinPartComponent } from '../abstract-join-part/abstract-join-part.component';

@Component({
  selector: 'app-join-part0',
  templateUrl: './join-part0.component.html',
  styleUrls: ['./join-part0.component.scss'],
})
export class JoinPart0Component extends AbstractJoinPartComponent implements OnInit {
  @Output() valuesOutput = new EventEmitter<{
    email: string;
    password: string;
  }>();

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) {
    super();
    this.formCrl = this.fb.group(
      {
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(32),
          haveUppercase,
          haveLowercase,
          haveDigit,
          haveSpace,
        ]),
        confirmPassword: this.fb.control('', [Validators.required]),
      },
      {validators: checkPasswords },
    );
  }

  ngOnInit(): void {}

  getValue() {
    return {
      email: this.formCrl.controls.email.value,
      password: this.formCrl.controls.password.value,
    };
  }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}