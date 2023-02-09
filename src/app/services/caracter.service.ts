import { caracterDTO } from './../models/caracter-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaracterService {
  caracterURL = environment.caracterURL;

  constructor(private http: HttpClient) {}

  public getCaracteres(): Observable<caracterDTO[]> {
    return this.http.get<caracterDTO[]>(this.caracterURL + 'all');
  }

  public getCaracterCargoId(id: number): Observable<caracterDTO> {
    return this.http.get<caracterDTO>(this.caracterURL + id);
  }
}
