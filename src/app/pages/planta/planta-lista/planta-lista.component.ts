import { Planta } from './../../../models/planta';
import { PlantaService } from './../../../services/planta.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planta-lista',
  templateUrl: './planta-lista.component.html',
  styleUrls: ['./planta-lista.component.css'],
})
export class PlantaListaComponent implements OnInit {
  planta_arr: Planta[] = [];

  pageSize = 5;
  page: number = 0;

  totalRegistro = 0;

  filtro_valor = '';

  constructor(
    private plantaService: PlantaService,
    private router: Router,
    activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarPlanta();
  }

  nextPage() {
    if (this.page < this.totalRegistro - this.pageSize)
      this.page += this.pageSize;
  }

  prevPage() {
    if (this.page > 0) this.page -= this.pageSize;
  }

  onSearch(search: string) {
    this.page = 0;
    this.filtro_valor = search;
  }

  cargarPlanta(): void {
    this.plantaService.getPlantaTotal().subscribe({
      next: (planta) => {
        this.planta_arr = planta;
        this.totalRegistro = this.planta_arr.length;
      },
    });
  }

  abrirEditar(planta: Planta) {
    this.router.navigate(['/planta/edit', planta.id]);
  }
}
