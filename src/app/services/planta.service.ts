import { Busqueda } from './../models/busqueda';
import { PuntoDetail } from './../models/puntoDetail';
import { HttpClient } from '@angular/common/http';
import { Planta } from './../models/planta';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlantaService {
  plantaURL = environment.plantaURL;

  constructor(private http: HttpClient) {}

  getPlantas(busqueda: Busqueda): Observable<Planta[]> {
    return this.http.post<Planta[]>(this.plantaURL + 'list', busqueda);
  }

  getPuntosOcupadosLibres(): Observable<PuntoDetail[]> {
    return this.http.get<PuntoDetail[]>(this.plantaURL + 'libres/ocupado');
  }

  getPlantaById(id: number): Observable<Planta> {
    return this.http.get<Planta>(this.plantaURL + `${id}`);
  }

  getPlantaByCargo(codigo: number): Observable<Planta[]> {
    return this.http.get<Planta[]>(this.plantaURL + `codigo/${codigo}`);
  }

  getPlantaTotal(): Observable<Planta[]> {
    return this.http.get<Planta[]>(this.plantaURL + 'all');
  }

  crearPlanta(planta: Planta): Observable<Planta> {
    return this.http.post<Planta>(this.plantaURL + 'create', planta);
  }

  actualizarPlanta(planta: Planta): Observable<Planta> {
    console.log('CODIGO PLANTA ' + planta.id);

    return this.http.put<Planta>(
      this.plantaURL + `update/${planta.id}`,
      planta
    );
  }
}
