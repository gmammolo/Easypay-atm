import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Cliente } from '../../shared/models/cliente.model';
import { UtenteType } from '../constants/utente-type.enum';
import { SelfStore } from '../store/self.store';
import { ApiRoute } from '../constants/routing.constants';
import { Conto } from '../../shared/models/conto.model';
import { ApiCliente } from '../api-models/api-cliente.model';
import { ApiConto } from '../api-models/api-conto.model';
import { ApiPostClienti } from '../api-models/api-post-cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private selfStore: SelfStore) {
  }

  /** Variante della getUtente senza autonticazione, restituisce un Utente senza informazioni sensibili */
  getClienteNoSecurity(id: string): Observable<Cliente>  {
    return this._getClient(id, { });
  }


  getClienteByPin(id: string, pin: string): Observable<Cliente>  {
    const params: {pin: string} =  { pin } ;
    return this._getClient(id, params);
  }

  getClienteByTokenOtp(qrCode: string): Observable<Cliente> {
    const  [id, otp] = qrCode.split('-');
    // const id = '0'; // TODO: ottenere l'id dall' OTP
    return this._getClient(id, { otp });
  }

  /** restituisce  */
  getSelfClient(): Observable<Cliente> {
    return this.http.get<ApiCliente>(`${ApiRoute.clienti}/self`).pipe(
      map(apiCliente => this.cleanCliente(apiCliente))
    );
  }

  getSelfConto(): Observable<Conto> {
    return this.http.get<ApiConto>(`${ApiRoute.conti}/self`).pipe(
      map(apiConto => ({...apiConto, id: apiConto.id + '', idCliente: apiConto.id_cliente + '' } as Conto)),
    );
  }


  register(data: ApiPostClienti): Observable<any> {
    return this.http.post(ApiRoute.clienti, data);
  }

  /** effettua la richiesta HTTP per verificare se il login del cliente va a buon fine */
  private _getClient(id: string, params: {pin?: string; otp?: string}): Observable<Cliente> {
    return this.http.get<ApiCliente>(`${ApiRoute.clienti}/${id}`, {params}).pipe(
        map(apiCliente => this.cleanCliente(apiCliente)),
        catchError(error => { throw(error); })
      );
  }

  /** riceve in input un apiCliente e modifica i parametri diversi in modo da ottenere un cliente */
  private cleanCliente(apiCliente: ApiCliente): Cliente {
    return ({
      type: UtenteType.cliente,
      ...apiCliente,
      id: apiCliente.id + '',
      idConto: apiCliente.id_conto + '',
      birthDate: apiCliente.birth_date,
    } as Cliente);
  }
}
