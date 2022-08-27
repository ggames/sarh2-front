import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { TipoDocumento } from './../models/tipodocumento';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  tipoDocumentoURL = environment.tipoDocURL;

  constructor(private http: HttpClient) {}

  getTipoDocumentos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(this.tipoDocumentoURL + 'tiposdocs');
  }

  getTipoDocumentoById(id: string): Observable<TipoDocumento> {
    return this.http.get<TipoDocumento>(
      this.tipoDocumentoURL + `tipodocs/${id}`
    );
  }
}
