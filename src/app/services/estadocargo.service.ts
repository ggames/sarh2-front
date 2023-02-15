import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoCargoDTO } from '../models/estadocargo-dto';

@Injectable({
  providedIn: 'root',
})
export class EstadocargoService {
  estadoCargoURL = environment.EstadoCargoURL;

  constructor(private http: HttpClient) {}

  getAllEstadosCargos(): Observable<EstadoCargoDTO[]> {
    return this.http.get<EstadoCargoDTO[]>(this.estadoCargoURL + 'all');
  }

  getEstadoCargoById(id: number): Observable<EstadoCargoDTO> {
    return this.http.get<EstadoCargoDTO>(this.estadoCargoURL + `${id}`);
  }
}
