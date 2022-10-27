import { TipoCargo } from './tipo-cargo';
import { PuntoOrigen } from './punto-origen';

export class Puntos {
  id?: number;
  tipo_cargo_id!: TipoCargo;
  origenes!: PuntoOrigen[];
  puntos_disponibles!: number;
  checked?: boolean;
  //cant_ocupado: number;
}
