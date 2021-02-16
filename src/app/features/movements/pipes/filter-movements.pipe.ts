import { Pipe, PipeTransform } from '@angular/core';
import { Movimento } from 'src/app/shared/models/movimento.model';

/** Dati in input un array di movimenti, rimuove i movimenti che hanno il from e il to coincidenti
 * (in quando inutile visualizzarli perchè portano lo stato invariato)
 */
@Pipe({
  name: 'filterMovements'
})
export class FilterMovementsPipe implements PipeTransform {

  transform(value: Movimento[], ...args: unknown[]): Movimento[] {
    if (value && Array.isArray(value)) {
      return value.filter(mov => mov.from !== mov.to);
    }
    return value;
  }

}
