import { PuntosDTO } from './../models/puntos-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Puntos } from '../models/puntos';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class PuntoService {
  puntoURL = environment.puntoURL;
  constructor(private http: HttpClient) {}

  getPuntos(transitorio: boolean, estados: number[]): Observable<PuntosDTO[]> {
    let params = new HttpParams();
    estados.forEach((id: number) => {
      params = params.append('estados', id);
    });

    /* for (let i = 0; i < estados.length; i++) {
      params = params.append('estados', estados[i]);
    } */

    console.log(
      'URL Puntos PARAMETROS ' +
        this.puntoURL +
        `transitorios/${transitorio}/` +
        params.toString()
    );

    return this.http.get<PuntosDTO[]>(
      this.puntoURL + `transitorios/${transitorio}`,
      {
        params: params,
      }
    );
  }

  getObtener(id: number): Observable<Puntos | null> {
    return this.http.get<Puntos>(this.puntoURL + id);
  }

  savePunto(punto: Puntos): Observable<Puntos> {
    console.log('NUEVO PUNTOS' + JSON.stringify(punto));
    //let puntos_origenes = new Array<PuntoOrigen>();

    /*  for (let origen of origenes) {
      const id: number = origen.id || 0;
      const cantidad: number = origen.cant_ocupado || 0;
      puntos_origenes.push(new PuntoOrigen(id, punto, cantidad));
    }

    pun(to.origenes = puntos_origenes;

 */ return this.http.post<Puntos>(this.puntoURL + 'create', punto);
  }

  updatePunto(punto: Puntos): Observable<Puntos> {
    console.log('ACTUALIZACION ' + JSON.stringify(punto));
    return this.http.put<Puntos>(this.puntoURL + `update/${punto.id}`, punto);
  }
}
