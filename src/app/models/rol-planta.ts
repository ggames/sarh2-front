import { Planta } from './planta';
import { SubUnidadOrganizativa } from './subunidad-organizativa';

export class RolPlanta {
  id?: number;
  tipoRol!: string;
  subunidadOrganizativaId!: SubUnidadOrganizativa;
  plantaId!: Planta;
}
