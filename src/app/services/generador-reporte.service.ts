import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Busqueda } from '../models/busqueda';

@Injectable({
  providedIn: 'root',
})
export class GeneradorReporteService {
  plantaURL = environment.plantaURL;

  constructor(private http: HttpClient) {}

  generatePlantaListPdf(busqueda: Busqueda) {
    return this.http.post(this.plantaURL + 'pdf', busqueda, {
      responseType: 'blob',
    });
  }

  generarePlantaListExcel(busqueda: Busqueda) {
    return this.http.post(this.plantaURL + 'export/excel', busqueda, {
      responseType: 'blob',
    });
  }
}
