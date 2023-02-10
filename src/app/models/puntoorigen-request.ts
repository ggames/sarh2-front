import { Puntos } from './puntos';

export class PuntoOrigenRequest {
  puntoOrigenId?: number;
  puntoId!: Puntos;
  cantOcupados!: number;
}
