import { SubUnidadOrganizativa } from './subunidad-organizativa';
import { Cargo } from 'src/app/models/cargo';
import { Agente } from './agente';

export class Planta {
  id?: number;
  agenteId!: Agente;
  cargoId!: Cargo;
  //subUnidadOrganizativaId!: SubUnidadOrganizativa;
  fechaMovimiento!: Date;
  motivoMovimiento!: string;
  resolucionInicio!: string;
  fechaInicio!: Date;
  resolucionFin!: string;
  fechaFin!: Date;
}
