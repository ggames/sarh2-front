export class PuntoDetail {
  id?: number;
  nombre!: string;
  apellido!: string;
  cargo!: string;
  estado!: string;
  codCargo!: number;
  disponible!: number;
  color: string = 'bg-info';
}
