import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

const TOKEN_KEY: string = 'AuthToken' as string;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  roles: Array<string> = [];

  constructor(private router: Router) {}

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY) || '';
  }

  public getUserName(): string | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token!.split('.')[1]; // OBTENGO LA SEGUNDA PORCION DEL TOKEN (El token esta dividido en 3 segmentos separados por punto)
    const payloadDecode = atob(payload);
    const values = JSON.parse(payloadDecode);
    const username = values.sub;

    return username;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token!.split('.')[1]; // OBTENGO LA SEGUNDA PORCION DEL TOKEN (El token esta dividido en 3 segmentos separados por punto)
    const payloadDecode = atob(payload);
    const values = JSON.parse(payloadDecode);
    const roles = values.roles;

    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
