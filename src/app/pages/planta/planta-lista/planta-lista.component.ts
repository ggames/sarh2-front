import { Planta } from './../../../models/planta';
import { PlantaService } from './../../../services/planta.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-planta-lista',
  templateUrl: './planta-lista.component.html',
  styleUrls: ['./planta-lista.component.css'],
})
export class PlantaListaComponent implements OnInit {
  planta_arr: Planta[] = [];
  pageSize = 5;
  i: number = 1;
  desde: number = 0;
  hasta: number = 5;

  constructor(private plantaService: PlantaService) {}

  ngOnInit(): void {
    this.cargarPlanta();
  }

  cargarPlanta(): void {
    this.plantaService.getPlantaTotal().subscribe({
      next: (planta) => {
        this.planta_arr = planta;
      },
    });
  }

  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }
}