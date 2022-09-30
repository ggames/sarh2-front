import { Puntos } from './puntos';
export interface TipoCargo {
  id?: number;
  cargo: string;
  cantidad_puntos: number;
  basico: number;
  puntos: Puntos[];
}
