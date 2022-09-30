import { environment } from './../../environments/environment';
import { TipoCargo } from './../models/tipo-cargo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoCargosService {
  TipoCargoURL = environment.tipoCargoURL;

  constructor(private http: HttpClient) {}

  getTiposCargos(): Observable<TipoCargo[]> {
    return this.http.get<TipoCargo[]>(this.TipoCargoURL + 'all');
  }

  getTipoCargo(id: number): Observable<TipoCargo> {
    return this.http.get<TipoCargo>(this.TipoCargoURL + id);
  }

  saveTipoCargo(TipoCargo: TipoCargo): Observable<TipoCargo> {
    return this.http.post<TipoCargo>(this.TipoCargoURL + 'create', TipoCargo);
  }

  updateTipoCargo(tipoCargo: TipoCargo): Observable<TipoCargo> {
    return this.http.put<TipoCargo>(
      this.TipoCargoURL + `update/${tipoCargo.id}`,
      tipoCargo
    );
  }
}
