export class Agente {
  id!: number;
  nombre!: string;
  apellido!: string;
  tipoDocId!: any;
  documento!: string;
  fechaNac!: string;
  email!: string;
  telefono!: string;
  domicilio!: string;
  legajo!: string;

  constructor(
    nombre: string,
    apellido: string,
    tipodocId: number,
    documento: string,
    fechanac: string,
    email: string,
    telefono: string,
    domicilio: string,
    legajo: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.tipoDocId = tipodocId;
    this.documento = documento;
    this.fechaNac = fechanac;
    this.email = email;
    this.telefono = telefono;
    this.domicilio = domicilio;
    this.legajo = legajo;
  }
}
