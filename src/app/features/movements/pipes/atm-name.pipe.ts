import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtenteService } from 'src/app/core/services/utente.service';
@Pipe({
  name: 'atmName'
})
export class AtmNamePipe implements PipeTransform {

  constructor(private utenteService: UtenteService) {

  }

  transform(idAtm: string, ...args: unknown[]): Observable<string> {
    if (!idAtm) {
      return null;
    }
    // return this.utenteService.getUtenteNoSecurity(idAtm).pipe(
    //   map(utente => utente.ragSoc )
    // );
    // TODO: attualmente c'è un unico atm
    return of('ATM01');
  }

}
