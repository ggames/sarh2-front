import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Transformacion } from '../models/transformacion';

@Injectable({
  providedIn: 'root',
})
export class TransformacionesService {
  transfURL = environment.transfURL;

  constructor(private httpClient: HttpClient) {}

  getTransformaciones(): Observable<Transformacion[]> {
    return this.httpClient.get<Transformacion[]>(this.transfURL + 'all');
  }

  saveTransformacion(
    transformacion: Transformacion
  ): Observable<Transformacion> {
    return this.httpClient.post<Transformacion>(
      this.transfURL + 'create',
      transformacion
    );
  }

  updateTransformacion(
    transformacion: Transformacion
  ): Observable<Transformacion> {
    return this.httpClient.put<Transformacion>(
      this.transfURL + `update/${transformacion.id}`,
      transformacion
    );
  }

  getTransformacion(id: number): Observable<Transformacion> {
    return this.httpClient.get<Transformacion>(this.transfURL + id);
  }
}
