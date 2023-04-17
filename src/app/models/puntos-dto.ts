import { TipoCargo } from './tipo-cargo';
import { PuntoOrigen } from './punto-origen';

export class PuntosDTO {
  id?: number;
  codPunto!: number;
  tipo_cargo!: TipoCargo;
  transitorio!: boolean;
  deRectorado!: boolean;
  origenes!: PuntoOrigen[];
  puntos_disponibles!: number;
  puntos_faltantes!: number;
  cant_ocupados!: number;
  checked: boolean = false;
  color: string = '';
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
