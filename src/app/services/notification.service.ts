import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agente } from '../models/agente';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationURL = environment.notificationURL;

  constructor(private http: HttpClient) {}

  getAgenteJubilacion(): Observable<Agente[]> {
    return this.http.get<Agente[]>(this.notificationURL);
  }

  sendNotification(): Observable<any> {
    return this.http.post(this.notificationURL + '  send', {});
  }
}
