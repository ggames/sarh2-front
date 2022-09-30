export class UnidadOrganizativa {
  id?: number;
  nombre?: string | null;
  directorId?: number | null;
  viceDirectorId?: number | null;

  constructor(
    id: number,
    nombre: string,
    directorId: number,
    viceDirectorId: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.directorId = directorId;
    this.viceDirectorId = viceDirectorId;
  }
}
