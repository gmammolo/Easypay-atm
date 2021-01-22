import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClienteService } from 'src/app/core';
@Pipe({
  name: 'atmName'
})
export class AtmNamePipe implements PipeTransform {

  constructor(private clienteService: ClienteService) {

  }

  transform(idAtm: string, ...args: unknown[]): Observable<string> {
    if (!idAtm) {
      return null;
    }
    return this.clienteService.getClienteNoSecurity(idAtm).pipe(
      map(utente => utente.ragSoc )
    );
  }

}
