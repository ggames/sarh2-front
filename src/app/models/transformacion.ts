export class Transformacion {

    id?: number;
    numero_resolucion?: string;
    resultado_transformacion?: number;

    constructor(nroresolucion: string, resultado: number){
        this.numero_resolucion = nroresolucion;
        this.resultado_transformacion = resultado;
    }
}