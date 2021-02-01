import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Utente } from '../../shared/models/utente.model';
import { UtenteType } from '../constants/utente-type.enum';
import { ApiRoute } from '../constants/routing.constants';
import { Conto } from '../../shared/models/conto.model';
import { ApiUtente } from '../api-models/api-utente.model';
import { ApiConto } from '../api-models/api-conto.model';
import { ApiPostClienti } from '../api-models/api-post-cliente.model';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  constructor(private http: HttpClient) {
  }

  /** Variante della getUtente senza autonticazione, restituisce un Utente senza informazioni sensibili */
  getUtenteNoSecurity(id: string): Observable<Utente>  {
    return this._getUtente(id, { });
  }


  getUtenteByPin(id: string, pin: string): Observable<Utente>  {
    const params: {pin: string} =  { pin } ;
    return this._getUtente(id, params);
  }

  getUtenteByTokenOtp(qrCode: string): Observable<Utente> {
    const  [id, otp] = qrCode.split('-');
    return this._getUtente(id, { otp });
  }

  /** restituisce  */
  getSelfUtente(): Observable<Utente> {
    return this.http.get<ApiUtente>(`${ApiRoute.clienti}/self`).pipe(
      map(apiUtente => this.cleanUtente(apiUtente))
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
  private _getUtente(id: string, params: {pin?: string; otp?: string}): Observable<Utente> {
    return this.http.get<ApiUtente>(`${ApiRoute.clienti}/${id}`, {params}).pipe(
        map(apiUtente => this.cleanUtente(apiUtente)),
        catchError(error => { throw(error); })
      );
  }

  /** riceve in input un apiUtente e modifica i parametri diversi in modo da ottenere un cliente */
  private cleanUtente(apiUtente: ApiUtente): Utente {
    return ({
      type: UtenteType.cliente,
      ...apiUtente,
      id: apiUtente.id + '',
      idConto: apiUtente.id_conto + '',
      birthDate: apiUtente.birth_date,
    } as Utente);
  }
}
