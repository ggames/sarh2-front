import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

import { TransformacionesService } from '../../../services/transformaciones.service';
import { CaracterService } from '../../../services/caracter.service';
import { EstadocargoService } from '../../../services/estadocargo.service';
import { UnidadOrganizativaService } from '../../../services/unidad-organizativa.service';
import { PuntoService } from '../../../services/punto.service';
import { CargoService } from '../../../services/cargo.service';

import { UnidadOrganizativa } from '../../../models/unidad-organizativa';
import { PuntosDTO } from '../../../models/puntos-dto';
import { caracterDTO } from '../../../models/caracter-dto';
import { Transformacion } from 'src/app/models/transformacion';
import { EstadoCargoDTO } from 'src/app/models/estadocargo-dto';
import { Cargo } from 'src/app/models/cargo';

//import { filter } from 'rxjs';

@Component({
  selector: 'app-cargo-nuevo',
  templateUrl: './dialog-cargo.component.html',
  styleUrls: ['./dialog-cargo.component.css'],
})
export class DialogCargoComponent implements OnInit {
  cargo!: Cargo;

  caracterCargo!: caracterDTO;
  unidadOrganizativa!: UnidadOrganizativa;
  estadoCargo!: EstadoCargoDTO;
  punto!: PuntosDTO;
  transfCreacion!: Transformacion;
  transfSupresion!: Transformacion;

  puntos: PuntosDTO[] = [];
  unidades: UnidadOrganizativa[] = [];
  estado_cargos: EstadoCargoDTO[] = [];
  caracter_cargos: caracterDTO[] = [];
  transf_creaciones: Transformacion[] = [];
  transf_supresiones: Transformacion[] = [];

  formCargo!: FormGroup;

  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cargoService: CargoService,
    private ptoService: PuntoService,
    private unidadService: UnidadOrganizativaService,
    private estadoCargoService: EstadocargoService,
    private caracterService: CaracterService,
    private transfService: TransformacionesService,
    @Inject(MAT_DIALOG_DATA) public _cargo: Cargo
  ) {}

  ngOnInit(): void {
    this.createForm();
    // this.obtenerPuntos();
    this.getUnidades();
    this.getEstadosCargos();

    this.getTransformaciones();

    if (this._cargo != null) {
      this.cargarCargo(this._cargo);
      this.cambiarCaracter();
      this.getCaracterCargos(3);
    } else {
      this.getCaracterCargos(-1);
    }
  }

  get cargoNoValido() {
    return (
      this.formCargo.get('idCargo')?.invalid &&
      this.formCargo.get('idCargo')?.touched
    );
  }

  get caracterNoValido() {
    return (
      this.formCargo.get('caracter')?.invalid &&
      this.formCargo.get('caracter')?.touched
    );
  }

  get unidadOrganizativaNoValido() {
    return (
      this.formCargo.get('unidadOrganizativaId')?.invalid &&
      this.formCargo.get('unidadOrganizativaId')?.touched
    );
  }

  get estadoCargoNoValido() {
    return (
      this.formCargo.get('estadoCargo')?.invalid &&
      this.formCargo.get('estadoCargo')?.touched
    );
  }

  get puntoNoValido() {
    return (
      this.formCargo.get('puntoId')?.invalid &&
      this.formCargo.get('puntoId')?.touched
    );
  }

  createForm() {
    this.formCargo = this.fb.group({
      idCargo: ['', Validators.required],
      caracter: [null, Validators.required],
      unidadOrganizativaId: [null, Validators.required],
      estadoCargo: [null, Validators.required],
      puntoId: [null, Validators.required],
      transfCreacionId: [null, Validators.required],
      transfSupresionId: [null],
    });
  }

  cargarCargo(cargo: Cargo): void {
    let values_cargo = {
      idCargo: cargo.idCargo,
      caracter: cargo.caracter.id,
      unidadOrganizativaId: cargo.unidadOrganizativaId.id,
      estadoCargo: cargo.estadoCargo.id,
      puntoId: cargo.puntoId.id,
      transfCreacionId: cargo.transfCreacionId.id,
      transfSupresionId: null,
    };
    this.caracterCargo = cargo.caracter;
    this.unidadOrganizativa = cargo.unidadOrganizativaId;
    this.estadoCargo = cargo.estadoCargo;
    this.punto = cargo.puntoId;
    this.transfCreacion = cargo.transfCreacionId;
    this.transfSupresion = cargo.transfSupresionId;

    this.formCargo.setValue(values_cargo);
  }

  getValue(event: Event): string {
    return (event.target as HTMLSelectElement).value.split(':')[1];
  }

  cambiarTransformacionSupresion(): void {
    let valor = this.formCargo.get('transfSupresionId')?.value;
    this.transfSupresion = this.transf_supresiones.find((t) => t.id == valor)!;
  }

  cambiarTransformacionCreacion(): void {
    let valor = this.formCargo.get('transfCreacionId')?.value;

    this.transfCreacion = this.transf_creaciones.find((t) => t.id == valor)!;
  }

  cambiarPunto(): void {
    let valor = this.formCargo.get('puntoId')?.value;

    this.punto = this.puntos.find((p) => p.id == valor)!;
  }

  cambiarEstadoCargo(): void {
    let valor = this.formCargo.get('estadoCargo')?.value;

    this.estadoCargo = this.estado_cargos.find((e) => e.id == valor)!;
  }

  cambiarUnidadOrganizativa(): void {
    let valor = this.formCargo.get('unidadOrganizativaId')?.value;

    this.unidadOrganizativa = this.unidades.find((u) => u.id == valor)!;
  }

  cambiarCaracter(): void {
    let valor = this.formCargo.get('caracter')?.value;

    this.caracterCargo = this.caracter_cargos.find((c) => c.id == valor)!;

    console.log('Valor de Caracter ' + JSON.stringify(this.caracterCargo));

    if (valor === 3) {
      this.ptoService.getPuntosLibres(true, [1, 2]).subscribe({
        next: (res) => {
          this.puntos = res;
        },
        error: (err) => {
          console.log('No Hay datos de puntos para contrato');
        },
      });
    } else {
      this.ptoService.getPuntosLibres(false, [1, 2]).subscribe({
        next: (res) => {
          this.puntos = res;
        },
        error: (err) => {
          console.log('No hay puntos disponibles');
        },
      });
    }
  }

  getPuntos(): void {
    this.ptoService.getPuntosLibres(false, [1, 2, 3]).subscribe({
      next: (res) => {
        this.puntos = res;
      },
    });
  }

  getUnidades(): void {
    this.unidadService.getUnidades().subscribe({
      next: (res) => {
        this.unidades = res;
      },
    });
  }

  getEstadosCargos(): void {
    this.estadoCargoService.getAllEstadosCargos().subscribe({
      next: (res) => {
        this.estado_cargos = res;
      },
    });
  }

  getCaracterCargos(valor: number): void {
    this.caracterService.getCaracteres().subscribe({
      next: (res) => {
        this.caracter_cargos = res;

        if (this._cargo != null) {
          this.caracter_cargos =
            this._cargo.caracter.id != valor
              ? this.caracter_cargos.filter((caracter) => caracter.id != valor)
              : this.caracter_cargos.filter((caracter) => caracter.id == valor);
        }
      },
    });
  }

  getTransformaciones(): void {
    this.transfService.getTransformaciones().subscribe({
      next: (res) => {
        this.transf_creaciones = res;
        this.transf_supresiones = res;
      },
    });
  }

  obtenerPuntos(): void {
    this.ptoService.obtenerPuntos().subscribe({
      next: (res) => {
        this.puntos = res;
      },
    });
  }

  onSave() {
    let cargo_nuevo = {
      idCargo: this.formCargo.get('idCargo')?.value,
      caracter: this.caracterCargo,
      unidadOrganizativaId: this.unidadOrganizativa,
      estadoCargo: this.estadoCargo,
      puntoId: this.punto,
      transfCreacionId: this.transfCreacion,
      transfSupresionId: this.transfSupresion,
    };

    // console.log('Objeto Cargo ' + JSON.stringify(this.cargo));

    this.cargoService.saveCargo(cargo_nuevo).subscribe({
      next: (res) => {
        console.log('El Cargo se guardo exitosamente');
      },
      error: (err) => {
        console.log('Error al guardar el Cargo');
      },
    });
  }

  onUpdate() {
    let cargo_update = {
      id: this._cargo.id,
      idCargo: this.formCargo.get('idCargo')?.value,
      caracter: this.caracterCargo,
      unidadOrganizativaId: this.unidadOrganizativa,
      estadoCargo: this.estadoCargo,
      puntoId: this.punto,
      transfCreacionId: this.transfCreacion,
      transfSupresionId: this.transfSupresion,
    };

    console.log(
      'Objeto Cargo Caracter' + JSON.stringify(cargo_update.caracter)
    );

    console.log(
      'Objeto Cargo Unidad Organizativa' +
        JSON.stringify(cargo_update.unidadOrganizativaId)
    );

    this.cargoService.updateCargo(cargo_update).subscribe({
      next: (res) => {
        console.log('El Cargo se guardo exitosamente');
      },
      error: (err) => {
        console.log('Error al guardar el Cargo');
      },
    });
  }
}
