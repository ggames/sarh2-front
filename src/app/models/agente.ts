import { TipoDocumento } from './tipodocumento';
export class Agente {
  id?: number;
  nombre!: string;
  apellido!: string;
  tipoDocId!: TipoDocumento;
  documento!: string;
  esFallecido!: boolean;
  fechaBaja!: string;
  fechaNac!: string;
  email!: string;
  telefono!: string;
  domicilio!: string;
  legajo!: string;
}
