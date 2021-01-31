import { MovimentoType } from '../constants/movimento-type.enum';

export interface ApiGetMovimenti {
  saldo: number;
  budget: number;
  movimenti: ApiMovimento[];
}

export interface ApiMovimento {
  id: number;
  valore: number;
  timestamp: string;
  id_atm?: number; // solo nelle ricariche
  type: MovimentoType;
  from?: any; // solo nelle pagamento
  from_name?: any; // solo nelle pagamento
  to: number;
  to_name: string;
}
