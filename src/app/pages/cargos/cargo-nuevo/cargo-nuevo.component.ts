import { CargoService } from './../../../services/cargo.service';
import { Cargo } from 'src/app/models/cargo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PuntosDTO } from './../../../models/puntos-dto';
import { caracterDTO } from './../../../models/caracter-dto';
import { EstadoCargo } from './../../../models/estadoCargo';
import { UnidadOrganizativa } from './../../../models/unidad-organizativa';
import { Puntos } from './../../../models/puntos';
import { TransformacionesService } from './../../../services/transformaciones.service';
import { Transformacion } from 'src/app/models/transformacion';
import { CaracterService } from './../../../services/caracter.service';
import { EstadocargoService } from './../../../services/estadocargo.service';
import { UnidadOrganizativaService } from './../../../services/unidad-organizativa.service';
import { PuntoService } from './../../../services/punto.service';
import { Component, OnInit } from '@angular/core';
import { EstadoCargoDTO } from 'src/app/models/estadocargo-dto';

@Component({
  selector: 'app-cargo-nuevo',
  templateUrl: './cargo-nuevo.component.html',
  styleUrls: ['./cargo-nuevo.component.css'],
})
export class CargoNuevoComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private cargoService: CargoService,
    private ptoService: PuntoService,
    private unidadService: UnidadOrganizativaService,
    private estadoCargoService: EstadocargoService,
    private caracterService: CaracterService,
    private transfService: TransformacionesService
  ) {}

  ngOnInit(): void {
    // this.getPuntos();
    this.createForm();
    this.getUnidades();
    this.getEstadosCargos();
    this.getCaracterCargos();
    this.getTransformaciones();
  }

  createForm() {
    this.formCargo = this.fb.group({
      idCargo: [0, Validators.required],
      caracter: [null, Validators.required],
      unidadOrganizativaId: [null, Validators.required],
      estadoCargo: [null, Validators.required],
      punto_id: [null, Validators.required],
      transfCreacionId: [null, Validators.required],
      transfSupresionId: [null, Validators.required],
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLSelectElement).value.split(':')[1];
  }

  changePuntos(event: Event): void {
    let valor = this.formCargo.get('caracter')?.value;

    if (valor.id === 3) {
      this.ptoService.getPuntos(true, [1, 2]).subscribe({
        next: (res) => {
          this.puntos = res;
        },
        error: (err) => {
          console.log('No Hay datos de puntos para contrato');
        },
      });
    } else {
      this.ptoService.getPuntos(false, [1, 2]).subscribe({
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
    this.ptoService.getPuntos(true, [3, 5]).subscribe({
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

  getCaracterCargos(): void {
    this.caracterService.getCaracteres().subscribe({
      next: (res) => {
        this.caracter_cargos = res;
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

  obtenerCaracterCargo(id: number) {
    this.caracterService.getCaracterCargoId(id).subscribe({
      next: (res) => {
        this.caracterCargo = res;
      },
      error: (err) => {
        console.log('Error de carga');
      },
    });
  }

  onSave() {
    this.cargo = {
      idCargo: this.formCargo.get('idCargo')?.value,
      caracter: this.formCargo.get('caracter_cargo')?.value,
      unidadOrganizativaId: this.formCargo.get('unidadOrganizativaId')?.value,
      estadoCargo: this.formCargo.get('estado_cargo')?.value,
      puntoId: this.formCargo.get('puntoId')?.value,
      transfCreacionId: this.formCargo.get('transfCreacionId')?.value,
      transfSupresionId: this.formCargo.get('transfSupresionId')?.value,
    };

    console.log('Objeto Cargo ' + JSON.stringify(this.cargo));

    this.cargoService.saveCargo(this.cargo).subscribe({
      next: (res) => {
        console.log('El Cargo se guardo exitosamente');
      },
      error: (err) => {
        console.log('Error al guardar el Cargo');
      },
    });
  }
}
