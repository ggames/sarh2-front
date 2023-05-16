import { UnidadOrganizativa } from './unidad-organizativa';
export class SubUnidadOrganizativa {
  id?: number;
  codigoGuarani!: string;
  nombre!: string;
  unidadOrganizativaId!: UnidadOrganizativa;
}
