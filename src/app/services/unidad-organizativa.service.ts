import { UnidadOrganizativa } from './../models/unidad-organizativa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnidadOrganizativaService {
  unidadURL = environment.unidadURL;

  constructor(private httpClient: HttpClient) {}

  getUnidades(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.unidadURL + 'all');
  }

  saveUnidad(unidad: UnidadOrganizativa): Observable<UnidadOrganizativa> {
    return this.httpClient.post<UnidadOrganizativa>(
      this.unidadURL + 'create',
      unidad
    );
  }

  updateUnidad(unidad: UnidadOrganizativa): Observable<UnidadOrganizativa> {
    return this.httpClient.put<UnidadOrganizativa>(
      this.unidadURL + `update/${unidad.id}`,
      unidad
    );
  }
  getUnidad(id: number): Observable<UnidadOrganizativa> {
    return this.httpClient.get<UnidadOrganizativa>(this.unidadURL + id);
  }
}
