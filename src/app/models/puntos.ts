import { TipoCargo } from './tipo-cargo';
import { PuntoOrigen } from './punto-origen';

export class Puntos {
  id?: number;
  codPunto!: number;
  tipo_cargo!: TipoCargo;
  transitorio!: boolean;
  deRectorado!: boolean;
  origenes!: PuntoOrigen[];
  puntos_disponibles!: number;
  puntos_faltantes!: number;
  checked?: boolean = false;
  // cant_ocupado!: number;
}
