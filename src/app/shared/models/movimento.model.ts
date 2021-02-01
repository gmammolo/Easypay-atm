import { MovimentoType } from 'src/app/core/constants/movimento-type.enum';

export interface Movimento {
  id: string;
  valore: number;
  timestamp: string;
  id_atm?: string; // solo nelle ricariche
  type: MovimentoType;
  from?: string; // solo nei pagamenti
  from_name?: string; // solo nei pagamenti
  to: string;
  to_name: string;
}
