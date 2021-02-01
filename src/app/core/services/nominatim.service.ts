import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGetNominatim } from '../api-models/api-get-nominatim.model';
import { Nominatim } from '../../shared/models/nominatim.model';

export interface NominatimSearchConfig {
  key: string;
  format: string;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  constructor(private http: HttpClient) { }

  public searchAddress(address: string, format = 'json', limit= 5, key = 'O8NebVs6bskCvb2E4bHdHqvgq6WNHZih' ): Observable<Nominatim[]> {
    return this.http.get<ApiGetNominatim[]>('https://open.mapquestapi.com/nominatim/v1/search.php', {params: {
      q: `[${address}]`,
      key,
      format,
      limit: limit + '',
    }});
  }
}
