import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PuntoService } from './../../../services/punto.service';
import { SelectionModel } from '@angular/cdk/collections';
import { PuntosDTO } from './../../../models/puntos-dto';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialogPuntos.component.html',
  styleUrls: ['./dialogPuntos.component.css'],
})
export class DialogPuntosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  puntosDisponible: PuntosDTO[] = [];

  total = 0;

  resto = 0;

  ocupado = 0;

  punto_disponible_aux!: number;

  estaconfirmado = false;

  checked = false;

  //puntosSeleccionados: PuntosDTO[] = [];

  selection = new SelectionModel<PuntosDTO>();

  datasource = new MatTableDataSource<PuntosDTO>();

  displayedColumns: string[] = [
    //    'select',
    'id',
    'tipo_cargo',
    'puntos_disponibles',
    'puntos_ocupados',
    'acciones',
  ];

  constructor(
    private puntoService: PuntoService,
    public dialogRef: MatDialogRef<DialogPuntosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    @Inject(MAT_DIALOG_DATA) public datos: PuntosDTO[]
  ) {}

  ngOnInit(): void {
    this.punto_disponible_aux = this.data;
    this.getPuntosLibres();
    // this.checkAllCheckBox();
  }

  getPuntosLibres() {
    this.puntoService.getPuntosLibres(false, [1, 2]).subscribe((res) => {
      this.datos = res;
    });
  }

  /*   checkAllCheckBox() {
    // Angular 13
    this.datos.forEach((x) => {
      x.checked = false;
    });
  }
  isAllCheckBoxChecked() {
    return this.datos.every((p) => p.checked);
  }
 */
  calcularPunto(pto: PuntosDTO, isChecked: boolean) {
    if (isChecked) {
      this.resto = pto.puntos_disponibles - this.data;
      this.ocupado = pto.puntos_disponibles - Math.max(0, this.resto);

      pto.cant_ocupados = this.ocupado;
      pto.puntos_disponibles = Math.max(0, this.resto);

      this.data = Math.abs(this.resto);
      this.total += pto.cant_ocupados;
      console.log('TOTAL PUNTOS ' + (this.punto_disponible_aux === this.total));
    }

    if (this.total === this.punto_disponible_aux) {
      this.estaconfirmado = !this.estaconfirmado;
    }
  }

  confirmarPuntos(): PuntosDTO[] {
    let suma = 0;

    this.puntosDisponible.forEach((x) => {
      if (x.checked === true) {
        this.datos.push(x);
        suma += x.puntos_disponibles;
      }
    });

    console.log('SUMA TOTAL ' + suma);
    return this.datos;
  }
}
