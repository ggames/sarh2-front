import { UnidadOrganizativa } from './unidad-organizativa';
export class SubUnidadOrganizativa {
  id?: number;
  codigoGuarani!: number;
  nombre!: string;
  unidadOrganizativaId!: UnidadOrganizativa;
}
