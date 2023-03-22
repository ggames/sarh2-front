import { PuntosDTO } from './puntos-dto';
import { Transformacion } from 'src/app/models/transformacion';
import { caracterDTO } from './caracter-dto';
import { EstadoCargoDTO } from './estadocargo-dto';
import { Puntos } from './puntos';
import { UnidadOrganizativa } from './unidad-organizativa';

export class Cargo {
  id?: number;
  idCargo: number = 0;
  unidadOrganizativaId!: UnidadOrganizativa;
  puntoId!: PuntosDTO;
  estadoCargo!: EstadoCargoDTO;
  caracter!: caracterDTO;
  transfCreacionId!: Transformacion;
  transfSupresionId!: Transformacion;
}
