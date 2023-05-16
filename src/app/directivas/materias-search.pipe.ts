import { Pipe, PipeTransform } from '@angular/core';
import { SubUnidadOrganizativa } from '../models/subunidad-organizativa';

@Pipe({
  name: 'materiasSearch',
  standalone: true,
})
export class MateriasSearchPipe implements PipeTransform {
  transform(
    materias: SubUnidadOrganizativa[],
    page: number = 0,
    search: string = ''
  ): SubUnidadOrganizativa[] {
    if (search.length == 0) return materias.slice(page, page + 5);

    const filteredMaterias = materias.filter((materia) =>
      materia.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return filteredMaterias.slice(page, page + 5);
  }
}
