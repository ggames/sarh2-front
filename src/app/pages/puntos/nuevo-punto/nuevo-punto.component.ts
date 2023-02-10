import { DialogPuntosComponent } from './../dialog/dialogPuntos.component';
import { MatDialog } from '@angular/material/dialog';
import { PuntoOrigenRequest } from './../../../models/puntoorigen-request';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UnidadesOrganizativasModule } from './../../unidades-organizativas/unidades-organizativas.module';
import { PuntoOrigen } from './../../../models/punto-origen';
import {
  Subscription,
  Observable,
  Subject,
  ReplaySubject,
  debounceTime,
  debounce,
} from 'rxjs';
import { PuntosDTO } from '../../../models/puntos-dto';
import { TipoCargo } from '../../../models/tipo-cargo';
import { TipoCargosService } from '../../../services/tipo-cargos.service';
import { Puntos } from '../../../models/puntos';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { PuntoService } from '../../../services/punto.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-puntos',
  templateUrl: './nuevo-punto.component.html',
  styleUrls: ['./nuevo-punto.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapse', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapse',
        animate('225ms cubic-bezier(0.4, 0.8, 0.2, 1)')
      ),
    ]),
  ],
})
export class NuevoPuntoComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  datasource = new MatTableDataSource<PuntosDTO>();

  puntos_disponibles = 0;

  total = 0;

  cantidad = 0;

  block = false;

  cantidadOcupados = 0;

  formPunto!: FormGroup;

  formDetalle!: FormGroup;

  detalleOrigenes: PuntoOrigenRequest[] = [];

  puntosDetalles: PuntosDTO[] = [];

  puntosDisponible: PuntosDTO[] = [];

  punto!: Puntos;

  tipo_c!: TipoCargo;

  tipocargos: TipoCargo[] = [];

  puntos: PuntosDTO[] = [];

  readonly width: string = '800px';

  subscripciones: Subscription[] = [];

  private puntos$!: Subject<Puntos>;

  private puntoDetalles$!: ReplaySubject<PuntoOrigen[]>;

  constructor(
    private puntoService: PuntoService,
    private tipoCargoService: TipoCargosService,
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.puntos$ = new Subject();
    this.puntoDetalles$ = new ReplaySubject();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    console.log('AddPuntoComponent: onInit');

    this.punto = new Puntos();

    this.punto.origenes = [];

    //this.puntoDetalle = new PuntoOrigen();

    this.getTipoCargos();

    this.createForm();
  }

  createForm() {
    this.formPunto = this.fb.group({
      // id: [this.punto.id],
      tipo_cargo: [this.punto.tipo_cargo ?? null, Validators.required],
      puntos_disponibles: [
        this.punto.puntos_disponibles ?? null,
        Validators.required,
      ],
      transitorio: [this.punto.transitorio ?? null],
    });

    this.formPunto.get('tipo_cargo')?.valueChanges.subscribe((valor) => {
      //this.formPunto.setValue({ tipo_cargo: valor.id });
      console.log('VALOR ' + JSON.stringify(valor));
    });

    /* this.subcripcionPunto =
      this.formDetalle
        .get('punto_origen')
        ?.valueChanges.pipe(debounceTime(700))
        .subscribe((data) => {}) || Subscription.EMPTY;

    this.subscripciones.push(this.subcripcionPunto); */
  }

  /**
   *  Si el numero total de elementos seleccionados es igual
   * al numero total de filas
   *
   */

  cambiarTipo() {
    this.tipoCargoService
      .getTipoCargo(this.formPunto.get('tipo_cargo')?.value)
      .subscribe({
        next: (res) => {
          console.log('Cantidad de puntos ' + res.cantidad_puntos);
          this.cantidad = res.cantidad_puntos;
          this.tipo_c = res;
          this.formPunto.patchValue({
            tipo_cargo: res.id ?? null,
            puntos_disponibles: res.cantidad_puntos ?? null,
          });
        },
        error: (err) => {
          console.log('No existe el tipo de cargo');
        },
      });
  }

  getTipoCargos() {
    this.tipoCargoService.getTiposCargos().subscribe({
      next: (res) => {
        this.tipocargos = res;
      },
      error: (err) => {
        console.log('Error en la carga de tipo de cargo');
      },
    });
  }

  addPuntosOrigen(): void {
    // console.log('PUNTOS ASOCIADOS ' + JSON.stringify(this.formPunto.value));

    this.puntosDetalles.forEach((x) =>
      //this.selection.selected.forEach((x) =>
      this.detalleOrigenes.push({
        puntoOrigenId: x?.id,
        puntoId: this.formPunto.value,
        cantOcupados: x.cant_ocupados,
      })
    );

    //    console.log('Puntos Origen ' + JSON.stringify(this.detalleOrigenes));
  }

  calcularPuntosOcupado(row: PuntosDTO) {
    this.total = row.puntos_disponibles;
    if (this.total <= this.cantidad) {
      row.cant_ocupados = row.puntos_disponibles;
      row.puntos_disponibles -= this.total;
      this.cantidad -= row.cant_ocupados;
      this.cantidadOcupados += row.cant_ocupados;
      this.puntosDetalles.push(row);
    } else {
      row.puntos_disponibles = this.total - this.cantidad;
      row.cant_ocupados = this.cantidad;
      this.puntosDetalles.push(row);
      this.cantidadOcupados += row.cant_ocupados;
    }

    let cant = this.formPunto.get('puntos_disponibles')?.value;
    if (this.cantidadOcupados === cant) {
      this.block = true;
    }

    // console.log(' Listar Puntos ' + JSON.stringify(this.selection.selected));
  }

  onSave(): void {
    this.addPuntosOrigen();

    this.punto = {
      tipo_cargo: this.tipo_c,
      puntos_disponibles: this.formPunto.get('puntos_disponibles')?.value,
      transitorio: this.formPunto.get('transitorio')?.value,
      origenes: [],
    };

    // console.log('VALOR DE TRANSITORIO ' + this.punto.transitorio);

    this.punto.origenes = this.detalleOrigenes;

    this.puntoService.savePunto(this.punto).subscribe({
      next: (res) => {
        console.log('El punto se guardo con exito');
      },
      error: (err) => {
        console.log('No se puede guardar el punto');
      },
    });
  }

  abrirDialogo(): void {
    const dialogRef = this.dialog.open(DialogPuntosComponent, {
      width: this.width,
      data: this.formPunto.get('puntos_disponibles')?.value,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        result.forEach((x: any) => {
          if (x.checked === true) this.puntosDetalles.push(x);
        });
      }
    });
  }
}
