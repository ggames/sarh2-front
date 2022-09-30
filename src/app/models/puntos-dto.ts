import { TipoCargo } from './tipo-cargo';
import { PuntoOrigen } from './punto-origen';

export interface PuntosDTO {
  id?: number;
  tipo_cargo: TipoCargo;
  origenes: PuntoOrigen[];
  puntos_disponibles: number;
  checked?: boolean;
}

// checked?: boolean = false;
// cant_ocupado?: number;

/* constructor(
    codigoCargo: string,
    nombreCargo: string,
    dedicacionCargo: string,
    cantidad_puntos: number
  ) {
    this.codigoCargo = codigoCargo;
    this.nombreCargo = nombreCargo;
    this.dedicacionCargo = dedicacionCargo;
    this.cantidad_puntos = cantidad_puntos;
  } */
