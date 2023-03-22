import { Observable } from 'rxjs';
import { Cargo } from './../models/cargo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  cargoURL = environment.cargoURL;

  constructor(private http: HttpClient) {}

  saveCargo(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(this.cargoURL + 'create', cargo);
  }

  updateCargo(cargo: Cargo): Observable<Cargo> {
    return this.http.put<Cargo>(this.cargoURL + `update/${cargo.id}`, cargo);
  }

  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.cargoURL + 'all');
  }

  getCargoByCodigo(nrocargo: number): Observable<Cargo> {
    return this.http.get<Cargo>(this.cargoURL + `${nrocargo}`);
  }
}
