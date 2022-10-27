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

  total = 0;

  cantidad = 0;

  block = false;

  cantidadOcupados = 0;

  formPunto!: FormGroup;

  formDetalle!: FormGroup;

  detalleOrigenes: PuntoOrigenRequest[] = [];

  puntosDetalles: PuntosDTO[] = [];

  punto!: Puntos;

  tipo_c!: TipoCargo;

  tipocargos: TipoCargo[] = [];

  puntos: PuntosDTO[] = [];

  displayedColumns: string[] = [
    'select',
    'id',
    'tipo_cargo',
    'puntos_disponibles',
    'puntos_ocupados',
    'acciones',
  ];

  dataSource = new MatTableDataSource<PuntosDTO>();

  selection = new SelectionModel<PuntosDTO>(true, []);

  subscripciones: Subscription[] = [];

  private puntos$!: Subject<Puntos>;

  private puntoDetalles$!: ReplaySubject<PuntoOrigen[]>;

  constructor(
    private puntoService: PuntoService,
    private tipoCargoService: TipoCargosService,
    private fb: FormBuilder,
    private sb: MatSnackBar
  ) {
    this.puntos$ = new Subject();
    this.puntoDetalles$ = new ReplaySubject();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    console.log('AddPuntoComponent: onInit');

    this.dataSource.paginator = this.paginator;

    this.punto = new Puntos();

    this.punto.origenes = [];

    //this.puntoDetalle = new PuntoOrigen();

    this.getTipoCargos();

    this.createForm();

    this.getPuntosLibres();
  }

  createForm() {
    this.formPunto = this.fb.group({
      // id: [this.punto.id],
      tipo_cargo_id: [this.punto.tipo_cargo_id, Validators.required],
      puntos_disponibles: [this.punto.puntos_disponibles, Validators.required],
      // puntos_disponible: ['', Validators.required],
    });

    this.formPunto.get('tipo_cargo_id')?.valueChanges.subscribe((valor) => {
      //     this.formPunto.setValue({ tipo_cargo: valor.id });
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? (this.selection.clear(), (this.puntosDetalles = []))
      : this.dataSource.data.forEach((row) => {
          this.selection.select(row);
        });
  }

  cambiarTipo() {
    this.formPunto.get('tipo_cargo_id')?.valueChanges.subscribe((res) => {
      console.log('Valor ' + res);
      this.formPunto.setValue({ tipo_cargo_id: res });
    });

    this.tipoCargoService
      .getTipoCargo(this.formPunto.get('tipo_cargo_id')?.value)
      .subscribe({
        next: (res) => {
          console.log('Cantidad de puntos ' + res.cantidad_puntos);
          this.cantidad = res.cantidad_puntos;
          this.tipo_c = res;
          this.formPunto.setValue({
            tipo_cargo_id: res.id,
            puntos_disponibles: res.cantidad_puntos,
          });
        },
        error: (err) => {
          console.log('No existe el tipo de cargo');
        },
      });
  }

  getPuntosLibres() {
    this.puntoService.getPuntos().subscribe((res) => {
      this.dataSource.data = res;
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

  selectionPuntosOrigen() {
    this.puntosDetalles = this.selection.selected;
    // console.log('Seleccionados ' + JSON.stringify(this.puntosDetalles));
  }

  reducirCantidadPuntos() {

    
  }

  addPuntosOrigen(): void {
    // console.log('PUNTOS ASOCIADOS ' + JSON.stringify(this.formPunto.value));

    // this.puntosDetalles.forEach((x) =>
    this.selection.selected.forEach((x) =>
      this.detalleOrigenes.push({
        puntoOrigenId: x.id,
        puntoId: this.formPunto.value,
        cantOcupados: x.cant_ocupados,
      })
    );

    console.log('Puntos Origen ' + JSON.stringify(this.detalleOrigenes));
  }

  /*   calcularPuntosOcupados() {
    this.puntosDetalles.forEach((x) => {
      this.total = x.puntos_disponibles;
      if (this.total <= this.cantidad) {
        x.cant_ocupados = x.puntos_disponibles;
        x.puntos_disponibles -= this.total;
        this.cantidad -= x.cant_ocupados;
        this.cantidadOcupados += x.cant_ocupados;
      } else {
        x.puntos_disponibles = this.total - this.cantidad;
        x.cant_ocupados = this.cantidad;
        this.cantidadOcupados += x.cant_ocupados;
      }
      if (this.cantidadOcupados >= this.cantidad) {
      }
    });

    console.log('Puntos Calculados ' + JSON.stringify(this.puntosDetalles));
  }
 */
  calcularPuntosOcupado(row: PuntosDTO) {
    if (this.selection.toggle(row)) {
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
    }
    // console.log(' Listar Puntos ' + JSON.stringify(this.selection.selected));
    console
      .log
      //  'Puntos Calculados ' + this.cantidadOcupados + ' ' + this.cantidad
      ();
  }

  onSave(): void {
    this.addPuntosOrigen();

    this.punto = {
      tipo_cargo_id: this.tipo_c,
      puntos_disponibles: this.formPunto.get('puntos_disponibles')?.value,
      origenes: [],
    };

    this.punto.origenes = this.detalleOrigenes;

    // console.log('PUNTOS NUEVO ' + JSON.stringify(this.punto));

    /*  this.puntoService.savePunto(this.punto).subscribe({
      next: (resp) => {
        console.log('Registro guardado con exito ' + resp);
      },
      error: (err) => {
        console.log('Error al intentar guardar el registro');
      },
    }); */
  }

  /*  calcularPuntos(row: PuntosDTO): void {
    if (this.selection.toggle(row)) {
      this.total += row.puntos_disponibles;

      if (this.total <= this.cantidad) {
        row.cant_ocupados = row.puntos_disponibles;
        console.log('Cantidad ocupado  ' + row.cant_ocupados);
        row.puntos_disponibles -= this.total;

        console.log('puntos disponibles ' + row.puntos_disponibles);
      } else {
        row.puntos_disponibles = this.total - this.cantidad;
        row.cant_ocupados = this.cantidad;
      }
    }
  } */

  deshacerCalculoTotal() {}
}
