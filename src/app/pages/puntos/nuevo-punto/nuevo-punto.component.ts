import { DialogPuntosComponent } from './../dialog/dialogPuntos.component';
import { MatDialog } from '@angular/material/dialog';
import { PuntoOrigenRequest } from './../../../models/puntoorigen-request';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  timeout,
  timer,
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
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { PuntoService } from '../../../services/punto.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class NuevoPuntoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('tipoCargo', { static: false })
  tipoCargo!: ElementRef<HTMLInputElement>;

  datasource = new MatTableDataSource<PuntosDTO>();

  // ****  VARIABLES DE PAGINACION ****************** ////

  pageSize = 5;
  i: number = 1;
  desde: number = 0;
  hasta: number = 5;

  // ***** TOTALIZADORES, RESTOS , CANTIDADES  ********** ///

  puntos_disponibles = 0;

  subtotal = 0;

  resto = 0;

  ocupado = 0;

  cantidad = 0;

  data!: number;

  // ****** VARIABLES BOOLEANAS ************************

  confirmado = false;

  block = false;

  submitted = false;

  //********** VARIABLES DE FORMULARIOS  ******/

  formPunto!: FormGroup;

  formDetalle!: FormGroup;

  //********** VARIABLES ARRAYS ******** */

  detalleOrigenes: PuntoOrigenRequest[] = [];

  puntosDetalles: PuntosDTO[] = [];

  puntosDisponible: PuntosDTO[] = [];

  tipocargos: TipoCargo[] = [];

  puntos_libres: PuntosDTO[] = [];

  subscripciones: Subscription[] = [];

  private puntos$!: Subject<Puntos>;

  private puntoDetalles$!: ReplaySubject<PuntoOrigen[]>;

  punto!: Puntos;

  tipo_c!: TipoCargo;

  readonly width: string = '800px';

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

  /*   ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
 */
  ngOnInit(): void {
    console.log('AddPuntoComponent: onInit');

    this.punto = new Puntos();

    this.punto.origenes = [];

    this.getTipoCargos();

    this.createForm();
  }

  get f() {
    return this.formPunto.controls;
  }

  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  createForm() {
    this.formPunto = this.fb.group({
      // id: [this.punto.id],
      codPunto: [0, Validators.required],
      tipo_cargo: [null, Validators.required],
      puntos_disponibles: [0],
      puntos_faltantes: [0],
      transitorio: [''],
    });
  }

  /**
   *  Si el numero total de elementos seleccionados es igual
   * al numero total de filas
   *
   */

  cambiarTipo() {
    const id = this.formPunto.get('tipo_cargo')?.value;
    if (id !== undefined || id !== null || id !== 0) {
      this.block = true;

      this.tipoCargoService.getTipoCargo(id).subscribe({
        next: (res) => {
          //  console.log('Cantidad de puntos ' + res.cantidad_puntos);
          this.cantidad = res.cantidad_puntos ?? null;
          this.data = res.cantidad_puntos;
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

      this.getPuntosLibres();
      this.puntosDetalles = [];
      this.confirmado = false;
      this.submitted = false;
      this.subtotal = 0;
    } else {
      this.block = false;
      this.getPuntosLibres();
    }
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
    let puntoNuevo = new Puntos();
    puntoNuevo.tipo_cargo = this.tipo_c;
    puntoNuevo.puntos_disponibles =
      this.formPunto.get('puntos_disponibles')?.value;
    puntoNuevo.transitorio = this.formPunto.get('transitorio')?.value;

    this.puntosDetalles.forEach((x) =>
      this.detalleOrigenes.push({
        puntoOrigenId: x?.id,
        puntoId: puntoNuevo,
        cantOcupados: x.cant_ocupados,
      })
    );

    //    console.log('Puntos Origen ' + JSON.stringify(this.detalleOrigenes));
  }

  // La funcion CALCULAR se utiliza

  calcular() {
    let total = 0;
    this.subtotal = 0;

    let totalptosCargo = this.data;

    this.puntos_libres.forEach((elem) => {
      // Si se tilda una fila realiza todos los calculos

      if (elem.checked) {
        // Con este control verifico que la sumaria (subtotal) no supere la cantidad
        // de puntos asociado al tipo de cargo

        if (this.subtotal < this.data) {
          // Cambia el color de la fila tildada si no supera a la cantidad de ptos asociados
          // al Tipo de cargo
          elem.color = 'bg-success';

          this.resto = elem.puntos_disponibles - totalptosCargo;

          this.ocupado = elem.puntos_disponibles - Math.max(0, this.resto);

          elem.cant_ocupados = this.ocupado;

          totalptosCargo = Math.abs(this.resto);

          total += elem.cant_ocupados;

          this.subtotal = total;

          // Este control verifica que el calculo total si supera a la cantidad de puntos
          // desmarca el check y cambia el color de la fila a vacio
          if (total > this.data) {
            elem.checked = false;
            elem.color = '';
            elem.cant_ocupados = 0;
            // this.subtotal = total;
          }
        } else {
          elem.checked = false;
          elem.cant_ocupados = 0;
          elem.color = '';
        }
      } else {
        elem.cant_ocupados = 0;
        elem.color = '';
        elem.checked = false;
        //total = 0;
        //this.subtotal = 0;
      }
    });
  }

  onSave(): void {
    this.submitted = true;

    if (this.formPunto.invalid) {
      return;
    }

    this.addPuntosOrigen();

    console.log(
      'Puntos faltantes ' +
        `${this.formPunto.get('puntos_disponibles')?.value - this.subtotal}`
    );

    this.punto = {
      codPunto: this.formPunto.get('codPunto')?.value,
      tipo_cargo: this.tipo_c,
      puntos_disponibles: this.formPunto.get('puntos_disponibles')?.value,
      puntos_faltantes:
        this.formPunto.get('puntos_disponibles')?.value - this.subtotal,
      transitorio: this.formPunto.get('transitorio')?.value,
      origenes: [],
    };

    this.punto.origenes = this.detalleOrigenes;

    console.log('VALOR DE TRANSITORIO ' + JSON.stringify(this.punto.origenes));

    this.puntoService.savePunto(this.punto).subscribe({
      next: (res) => {
        console.log('El punto se guardo con exito');
      },
      error: (err) => {
        console.log(err.error.mensaje);
      },
    });

    this.formReset();
  }

  /*  abrirDialogo(): void {
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
 */
  getPuntosLibres() {
    this.puntoService.getPuntosLibres(false, [1, 2]).subscribe((res) => {
      this.puntos_libres = res;
    });
  }

  /* calcularPunto(pto: PuntosDTO, isChecked: boolean) {
    console.log('CANTIDAD DE PUNTOS ASOCIADOS ' + this.data);

    if (isChecked) {
      this.resto = pto.puntos_disponibles - this.data;
      this.ocupado = pto.puntos_disponibles - Math.max(0, this.resto);

      pto.cant_ocupados = this.ocupado;
      pto.puntos_disponibles = Math.max(0, this.resto);

      this.data = Math.abs(this.resto);
      this.total += pto.cant_ocupados;
      // console.log('TOTAL PUNTOS ' + (this.punto_disponible_aux === this.total));
    }
  }
 */
  confirmarPuntos(): PuntosDTO[] {
    let suma = 0;

    this.puntos_libres.forEach((x) => {
      let resta;
      if (x.checked && x.cant_ocupados > 0) {
        resta = x.puntos_disponibles - x.cant_ocupados;
        x.puntos_disponibles = resta;
        this.puntosDetalles.push(x);
        suma += x.puntos_disponibles;
      }
    });
    this.confirmado = true;
    return this.puntos_libres;
  }

  formReset(): void {
    this.formPunto.reset();
    this.getPuntosLibres();
    this.puntosDetalles = [];
    this.puntosDisponible = [];
    this.confirmado = false;
    this.submitted = false;
  }
}
