import { RolPlanta } from './../models/rol-planta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolPlantaService {
  rolplantaURL = environment.rolplantaURL;

  constructor(private http: HttpClient) {}

  obtenerRolPlantas(): Observable<RolPlanta[]> {
    return this.http.get<RolPlanta[]>(this.rolplantaURL + 'all');
  }

  saveRolPlanta(rolplanta: RolPlanta): Observable<RolPlanta> {
    return this.http.post<RolPlanta>(this.rolplantaURL + 'create', rolplanta);
  }
}
