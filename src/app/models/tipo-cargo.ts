import { Puntos } from './puntos';
export class TipoCargo {
  id?: number;
  cargo!: string;
  cantidad_puntos: number = 0;
  basico!: number;
  puntos!: Puntos[];
}
