import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../models/usuario-dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuarioURL = environment.usuarioURL;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.usuarioURL);
  }
}
