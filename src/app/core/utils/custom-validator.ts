import { AbstractControl, FormGroup } from '@angular/forms';
// NOTA: apparentemente la risposta { [errorName]: false } viene cmq bloccata dal validatore.
// Trick Solution: in caso di validatore corretto passo null.

/** form validator per verificare se l'età inserita (presumibilmente di nascita) sia maggiore di 18 */
export function isOver18(control: AbstractControl): { [key: string]: boolean } {
  const errorCode = 'isOver18';

  if (control && control.value) {
    const age = getBirthday(control.value);
    return  age >= 0 && age < 18 ? { [errorCode]: true } : null;
  }
  return null;
}

/** form validator per verificare se lutente è effettivamente nato (anni >= 0) */
export function isBorn(control: AbstractControl): { [key: string]: boolean } {
  const errorCode = 'isBorn';

  if (control && control.value) {
    const bornDate = control.value;
    return Date.now() - bornDate.getTime() < 0 ? { [errorCode]: true } : null;
  }
  return null;
}

/** verifica che il formato del numero sia corretto  */
export function isPhone(control: AbstractControl): { [key: string]: boolean } {
  const errorCode = 'isPhone';
  if (control && control.value) {
    const phone = control.value;
    const test = new RegExp('^[0-9]{2}[/][0-9]{2}[/](?:(?:[1][9][0-9]{2})|(?:[2][0][0-9]{2}))$').test(phone);
    return test ? { [errorCode]: true }  : null;

  }
  return null;
}

/** Verifica se è presente almeno un valore uppercase */
export function haveUppercase(control: AbstractControl): { [key: string]: boolean } {
  const errorCode = 'notHaveUppercase';
  if (control && control.value) {
    const password = control.value;
    const test = new RegExp('[A-Z]+', 'g').test(password);
    return !test ? { [errorCode]: true }  : null;
  }
  return null;
}

/** Verifica se è presente almeno un valore Lowercase */
export function haveLowercase(control: AbstractControl): { [key: string]: boolean } {
  const errorCode = 'notHaveLowercase';
  if (control && control.value) {
    const password = control.value;
    const test = new RegExp('[a-z]+', 'g').test(password);
    return !test ? { [errorCode]: true }  : null;
  }
  return null;
}

/** Verifica se è presente almeno un valore numerico */
export function haveDigit(control: AbstractControl): { [key: string]: boolean } {
  const errorCode = 'notHaveDigit';
  if (control && control.value) {
    const password = control.value;
    const test = new RegExp('[0-9]+', 'g').test(password);
    return !test ? { [errorCode]: true }  : null;
  }
  return null;
}

/** Verifica se sono presenti degli spaz */
export function haveSpace(control: AbstractControl): { [key: string]: boolean } {
  const errorCode = 'haveSpace';
  if (control && control.value) {
    const password = control.value;
    // \S+ matches any non-whitespace character (equal to [^\r\n\t\f\v ])
    const test = new RegExp('^\S+$', 'g').test(password);
    return test ? { [errorCode]: true }  : null;
  }
  return null;
}

export function checkPasswords(group: FormGroup) {
  const password = group.get('password').value;
  const confirmPassword = group.get('confirmPassword').value;

  return password === confirmPassword ? null : { notSame: true };
}




/**
 * funzione che restituisce gli anni dell' utente
 * NOTA: funzione semplificata che non tiene conto di ora solare ed eventuali calcoli particolari sul calendario
 * ma sifficiente a scopo dimostrativo per questo progetto.
 */
function getBirthday(bornDate: Date): number {
  const ageDifMs = Date.now() - bornDate.getTime();
  if (ageDifMs < 0) {
    return -1;
  }
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

