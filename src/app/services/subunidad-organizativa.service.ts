import { SubUnidadOrganizativa } from './../models/subunidad-organizativa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubunidadOrganizativaService {
  subunidadURL = environment.subunidadURL;

  constructor(private http: HttpClient) {}

  obtenerSubunidades(): Observable<SubUnidadOrganizativa[]> {
    return this.http.get<SubUnidadOrganizativa[]>(this.subunidadURL + 'all');
  }

  save(subunidad: SubUnidadOrganizativa): Observable<SubUnidadOrganizativa> {
    return this.http.post<SubUnidadOrganizativa>(
      this.subunidadURL + 'create',
      subunidad
    );
  }

  update(subunidad: SubUnidadOrganizativa): Observable<SubUnidadOrganizativa> {
    return this.http.put<SubUnidadOrganizativa>(
      this.subunidadURL + `update/${subunidad.id}`,
      subunidad
    );
  }
}
