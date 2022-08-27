import { PuntoOrigen } from './punto-origen';

export interface Puntos {
  id: number;
  codigoCargo: string;
  nombreCargo: string;
  dedicacionCargo: string;
  origenes: PuntoOrigen[];
  cantidad_puntos: number;
  checked?: boolean;
  cant_ocupado: number;
}
