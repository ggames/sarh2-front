import { PuntoDetail } from './../../../models/puntoDetail';
import { Planta } from './../../../models/planta';
import { PlantaService } from './../../../services/planta.service';
import { PuntosDTO } from './../../../models/puntos-dto';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PuntoOrigen } from './../../../models/punto-origen';
import { Puntos } from './../../../models/puntos';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PuntoService } from './../../../services/punto.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lista-puntos',
  templateUrl: './lista-puntos.component.html',
  styleUrls: ['./lista-puntos.component.css'],
})
export class ListaPuntosComponent implements OnInit, AfterViewInit {
  // ****  VARIABLES DE PAGINACION ****************** ////

  pageSize = 10;
  i: number = 1;
  desde: number = 0;
  hasta: number = 10;

  public puntosOrigen: PuntoOrigen[] = [];

  puntos: PuntosDTO[] = [];

  ocupadoLibres: PuntoDetail[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngAfterViewInit(): void {
    //    this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
    // this.pintarRegistroPorEstado();
  }

  readonly width: string = '600px';

  constructor(
    private puntoService: PuntoService,
    private plantaService: PlantaService,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    //this.obtenerAllPuntos();
    this.obtenerPuntosLibreOcupados();
  }

  obtenerPuntosLibreOcupados(): void {
    this.plantaService.getPuntosOcupadosLibres().subscribe({
      next: (res) => {
        this.ocupadoLibres = res;
        this.pintarRegistroPorEstado();
      },
    });
  }

  pintarRegistroPorEstado(): void {
    console.log('Puntos Ocupados y Libre ' + this.ocupadoLibres.length);

    this.ocupadoLibres.forEach((elem) => {
      if (elem.disponible == 0) {
        elem.color = 'bg-danger';
        console.log('COLOR ' + elem.color);
      }
      if (elem.disponible > 0) {
        elem.color = 'bg-success';
        console.log('COLOR ' + elem.color);
      }
      if (elem.codCargo !== null) {
        elem.color = 'bg-warning';
        console.log('COLOR ' + elem.color);
      }
    });
  }

  obtenerAllPuntos(): void {
    this.puntoService.obtenerPuntos().subscribe({
      next: (res) => {
        this.puntos = res;
      },
    });
  }

  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }
}
