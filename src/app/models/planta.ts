import { SubUnidadOrganizativa } from './subunidad-organizativa';
import { Cargo } from 'src/app/models/cargo';
import { Agente } from './agente';

export class Planta {
  id?: number;
  agenteId!: Agente;
  cargoId!: Cargo;
  subunidadOrganizativaId!: SubUnidadOrganizativa;
  fechaMovimiento!: string;
  motivoMovimiento!: string;
  resolucionInicio!: string;
  fechaInicio!: string;
  resolucionFin!: string;
  fechaFin!: string;
  fechaCese!: string;
  lic_Desde!: string;
  lic_Hasta!: string;
}
