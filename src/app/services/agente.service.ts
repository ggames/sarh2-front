import { Agente } from './../models/agente';
import { TipoDocumento } from './../models/tipodocumento';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgenteService {
  agenteURL = environment.agenteURL;

  constructor(private httpClient: HttpClient) {}

  public getAllAgentes(): Observable<any> {
    return this.httpClient.get(this.agenteURL + 'all');
  }

  public getAgenteByDocumento(documento: number): Observable<any> {
    return this.httpClient.get(this.agenteURL + `${documento}`);
  }

  public obtenerAgente(id: number): Observable<any> {
    return this.httpClient.get(this.agenteURL + id);
  }

  public saveAgente(agente: Agente): Observable<Agente> {
    return this.httpClient.post<Agente>(this.agenteURL + 'create', agente);
  }

  public actualizarAgente(agente: Agente): Observable<Agente> {
    return this.httpClient.put<Agente>(
      this.agenteURL + `update/${agente.id}`,
      agente
    );
  }
}
