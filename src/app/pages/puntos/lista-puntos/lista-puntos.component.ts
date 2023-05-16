import { SortPipe } from './../../../directivas/sort.pipe';
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

  page: number = 0;
  pageSize = 5;

  filtro_valor = '';

  totalRegistro = 0;

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
    private sortPipe: SortPipe,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    //this.obtenerAllPuntos();
    this.obtenerPuntosLibreOcupados();

    this.sortPipe.transform(this.ocupadoLibres, 'desc', 'id');
  }

  onSearch(search: string) {
    this.page = 0;
    this.filtro_valor = search;
  }

  prevPage() {
    if (this.page > 0) this.page -= this.pageSize;
  }

  nextPage() {
    if (this.page < this.totalRegistro - this.pageSize)
      this.page += this.pageSize;
  }

  obtenerPuntosLibreOcupados(): void {
    this.plantaService.getPuntosOcupadosLibres().subscribe({
      next: (res) => {
        this.ocupadoLibres = res;
        this.totalRegistro = this.ocupadoLibres.length;
        this.pintarRegistroPorEstado();
      },
    });
  }

  pintarRegistroPorEstado(): void {
    console.log('Puntos Ocupados y Libre ' + this.ocupadoLibres.length);

    this.ocupadoLibres.forEach((elem) => {
      if (elem.disponible == 0 && elem.estado == 'Vacante Definitiva') {
        elem.color = 'bg-danger';
        console.log('COLOR ' + elem.color);
      }
      if (
        elem.disponible > 0 &&
        (elem.estado == 'Vacante Definitiva' || elem.estado == null)
      ) {
        elem.color = 'bg-success';
        console.log('COLOR ' + elem.color);
      }
      if (elem.disponible > 0 && elem.estado == 'Ocupado') {
        elem.color = 'bg-info';
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
}
