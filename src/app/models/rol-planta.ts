import { Planta } from './planta';
import { SubUnidadOrganizativa } from './subunidad-organizativa';

export class RolPlanta {
  id?: number;
  tipoRol!: string;
  subunidadOrganizacionalId!: SubUnidadOrganizativa;
  plantaId!: Planta;
}
