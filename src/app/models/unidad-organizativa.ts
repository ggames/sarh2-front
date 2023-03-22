import { Cargo } from 'src/app/models/cargo';
import { SubUnidadOrganizativa } from './subunidad-organizativa';
export class UnidadOrganizativa {
  id?: number;
  nombre!: string;
  directorId!: number;
  viceDirectorId?: number;
  subunidades: SubUnidadOrganizativa[] = [];
  ucargos: Cargo[] = [];
}
