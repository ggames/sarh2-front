import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PuntoOrigen } from './../../../models/punto-origen';
import { Puntos } from './../../../models/puntos';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PuntoService } from './../../../services/punto.service';
import { DialogpuntoComponent } from './../nuevo-punto/dialog/dialogpunto.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lista-puntos',
  templateUrl: './lista-puntos.component.html',
  styleUrls: ['./lista-puntos.component.css'],
})
export class ListaPuntosComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = [
    'id',
    'codigoCargo',
    'nombreCargo',
    'dedicacionCargo',
    'cantidad_puntos',
    'action',
  ];

  public displayedHeaderColumns: string[] = [
    'id',
    'codigo Cargo',
    'Nombre Cargo',
    'Dedicacion Cargo',
    'Cantidad Puntos',
  ];

  public dataSource = new MatTableDataSource<Puntos>();
  public puntosOrigen: PuntoOrigen[] = [];

  resultsLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  readonly width: string = '600px';

  constructor(
    private puntoService: PuntoService,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPuntos();
  }

  getPuntos(): void {
    this.puntoService.getPuntos().subscribe((res) => {
      this.dataSource.data = res;
      console.log(res);
    });
  }

  openAdd() {
    const dialogRef = this.matDialog.open(DialogpuntoComponent, {});
    dialogRef.afterClosed().subscribe((result) => this.getPuntos());
  }
}
