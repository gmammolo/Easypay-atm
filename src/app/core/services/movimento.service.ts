import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiRoute } from '../constants/routing.constants';
import { ApiGetMovimenti, ApiMovimento } from '../api-models/api-movimento.model';
import { Movimento } from 'src/app/shared/models/movimento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimentoService {

  constructor(private http: HttpClient) { }


  /** effettua un movimento di pagamento sul idContoCliente */
  pagamento(idContoCliente: string, idContoCommerciante: string, prezzo: string) {
    const params = {
      from: idContoCliente,
      to: idContoCommerciante,
      value: prezzo,
    };
    return this.http.post<{ success: boolean; error?: { id: string; message: string } }>(ApiRoute.pagamenti, params);
  }

  /** effettua un movimento di caricamento sul cliente indicato da idCliente */
  ricarica(idContoCliente: string, idAtm: string, prezzo: string) {

    const params = {
      id_atm: idAtm,
      to: idContoCliente,
      value: prezzo,
    };
    return this.http.post<{ success: boolean; error?: { id: string; message: string } }>(ApiRoute.ricariche, params);
  }

  /**
   * restituisce i movimenti del conto identificato
   * @param conto id del conto che si vuole ricercare (può essere self)
   * @param direction tipo di ordinamento
   * @param from data di inizio periodo di ricerca (AAAA-MM-GG)
   * @param to data di fine periodo di ricerca (AAAA-MM-GG)
   */
  getMovimenti(conto: string, direction: string= '', from: string= '', to: string= ''): Observable<Movimento[]> {
    return this.http.get<ApiGetMovimenti>(ApiRoute.movimenti, {params: {conto, direction, from, to}}).pipe(
      map(result => result.movimenti),
      map(apiMovis => apiMovis.map(apiMov => this.cleanMovimento(apiMov)) )
    );
  }

  /**
   * restituisce solo le ricariche del conto identificato
   * @param conto id del conto che si vuole ricercare (può essere self)
   * @param direction tipo di ordinamento
   * @param from data di inizio periodo di ricerca (AAAA-MM-GG)
   * @param to data di fine periodo di ricerca (AAAA-MM-GG)
   */
  getRicariche(conto: string, direction: string= '', from: string= '', to: string= ''): Observable<Movimento[]> {
    return this.http.get<ApiGetMovimenti>(ApiRoute.ricariche, {params: {conto, direction, from, to}}).pipe(
      map(result => result.movimenti),
      map(apiMovis => apiMovis.map(apiMov => this.cleanMovimento(apiMov)) )
    );
  }

  /**
   * restituisce solo i pagamenti del conto identificato
   * @param conto id del conto che si vuole ricercare (può essere self)
   * @param direction tipo di ordinamento
   * @param from data di inizio periodo di ricerca (AAAA-MM-GG)
   * @param to data di fine periodo di ricerca (AAAA-MM-GG)
   */
  getPagamenti(conto: string, direction: string= '', from: string= '', to: string= ''): Observable<Movimento[]> {
    return this.http.get<ApiGetMovimenti>(ApiRoute.pagamenti, {params: {conto, direction, from, to}}).pipe(
      map(result => result.movimenti),
      map(apiMovis => apiMovis.map(apiMov => this.cleanMovimento(apiMov)) )
    );
  }

  /** ripulisce la risposta di un movimento dal BE e restituisce un Movimento da usare */
  private cleanMovimento(apiMov: ApiMovimento): Movimento {
    return {
      ...apiMov,
      id: apiMov.id + '',
      id_atm: apiMov.id_atm + '',
      from: apiMov.from + '',
      to: apiMov.to + '',
    };
  }
}
