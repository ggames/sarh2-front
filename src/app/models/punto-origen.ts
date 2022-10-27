import { Puntos } from './puntos';

export class PuntoOrigen {
  id?: number;
  puntoOrigenId?: number;
  puntoId!: Puntos;
  cantOcupados!: number;
}

/* constructor(puntoOrigenId: number, puntoId: Puntos, cantOcupados: number) {
  this.puntoOrigenId = puntoOrigenId;
  this.puntoId = puntoId;
  this.cantOcupados = cantOcupados;
} */
