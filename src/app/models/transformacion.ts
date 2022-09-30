export class Transformacion {
  id?: number | null;
  numeroResolucion?: string | null;
  resultadoTransformacion?: string | null;

  constructor(nroresolucion: string, resultado: string) {
    this.numeroResolucion = nroresolucion;
    this.resultadoTransformacion = resultado;
  }
}
