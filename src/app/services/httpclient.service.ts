import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpclientService {
  constructor(private _httpClient: HttpClient) {}

  get<T>(url: string) {
    return this._httpClient
      .get<T>(`${environment.API_URL}/${url}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch details
  getList<T>(url: string) {
    return this._httpClient
      .get<T[]>(`${environment.API_URL}/${url}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  post(paylods: any) {
    return this._httpClient
      .post(environment.API_URL, paylods)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch details
  getTableData(api: any[]) {
    return forkJoin(() => api);
  }
  // Handle Error
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client - side error
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }
}
