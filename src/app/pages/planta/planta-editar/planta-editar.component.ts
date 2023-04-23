import { RolPlanta } from './../../../models/rol-planta';
import { RolPlantaService } from './../../../services/rol-planta.service';
import { SubUnidadOrganizativa } from './../../../models/subunidad-organizativa';
import { SubunidadOrganizativaService } from './../../../services/subunidad-organizativa.service';
import { Cargo } from 'src/app/models/cargo';
import { Agente } from './../../../models/agente';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { Planta } from './../../../models/planta';
import { TipoDocumentoService } from './../../../services/tipo-documento.service';
import { PuntoService } from './../../../services/punto.service';
import { UnidadOrganizativaService } from './../../../services/unidad-organizativa.service';
import { EstadocargoService } from './../../../services/estadocargo.service';
import { CaracterService } from './../../../services/caracter.service';
import { TipoCargosService } from './../../../services/tipo-cargos.service';
import { TransformacionesService } from './../../../services/transformaciones.service';
import { AgenteService } from './../../../services/agente.service';
import { CargoService } from './../../../services/cargo.service';
import { PlantaService } from './../../../services/planta.service';
import { TipoDocumento } from './../../../models/tipodocumento';
import { PuntosDTO } from './../../../models/puntos-dto';
import { UnidadOrganizativa } from './../../../models/unidad-organizativa';
import { Transformacion } from './../../../models/transformacion';
import { EstadoCargoDTO } from './../../../models/estadocargo-dto';
import { caracterDTO } from './../../../models/caracter-dto';

@Component({
  selector: 'app-planta-editar',
  templateUrl: './planta-editar.component.html',
  styleUrls: ['./planta-editar.component.css'],
})
export class PlantaEditarComponent implements OnInit {
  formPlanta!: FormGroup;

  reg_planta!: Planta;

  caracter_list: caracterDTO[] = [];

  estadocargo_list: EstadoCargoDTO[] = [];

  transformacion_list: Transformacion[] = [];

  subunidades: SubUnidadOrganizativa[] = [];

  puntos: PuntosDTO[] = [];

  tipodocumento_list: TipoDocumento[] = [];

  planta = new Planta();

  rolplanta!: RolPlanta;

  subunidad!: SubUnidadOrganizativa;

  agente = new Agente();

  cargo = new Cargo();

  estadoCargo!: EstadoCargoDTO;

  constructor(
    private plantaService: PlantaService,
    private cargoService: CargoService,
    private agenteService: AgenteService,
    private tr_service: TransformacionesService,
    private tipoCargoService: TipoCargosService,
    private caracterService: CaracterService,
    private estadocargoService: EstadocargoService,
    private subunidadService: SubunidadOrganizativaService,
    private puntoService: PuntoService,
    private tipoDocumentoService: TipoDocumentoService,
    private rolPlantaService: RolPlantaService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.obtenerCaracteres();
    this.obtenerEstadosCargos();
    this.obtenerTransformaciones();
    this.obtenerSubUnidadesOrganizativas();
    this.obtenerTodosPuntos();
    this.obtenerTipoDocumento();

    this.activatedRoute.params.subscribe((params: any) => {
      const _id = params?.id;

      if (_id !== undefined && typeof _id == 'number') {
        console.log('Valor del parametro ' + _id);
      }
      this.cargarPlanta(_id);
      this.cambiarSubunidadOrganizativa();
    });
  }

  cargarPlanta(id: number) {
    console.log('Valor del parametro PLANTA' + id);

    this.plantaService.getPlantaById(id).subscribe({
      next: (planta) => {
        this.reg_planta = planta;

        this.cargarFormPlanta(this.reg_planta);
      },
    });
  }

  createForm() {
    this.formPlanta = this.fb.group({
      idCargo: [0, Validators.required],
      tipoCargo: [null],
      subunidadOrganizativaId: [null, Validators.required],
      caracter: [null, Validators.required],
      estadoCargo: [null, Validators.required],
      puntoId: [null],
      transfCreacionId: [null, Validators.required],
      transfSupresionId: [null],
      tipoDocId: [null],
      documento: [null, Validators.required],
      nombre: [''],
      apellido: [''],
      legajo: [0],
      fechaNac: [null],
      fechaMovimiento: [null],
      motivoMovimiento: [null],
      resolucionInicio: [null],
      fechaInicio: [null],
      resolucionFin: [null],
      fechaFin: [null],
      fechaCese: [null],
      lic_Desde: [null],
      lic_Hasta: [null],
    });
  }

  obtenerCaracteres(): void {
    this.caracterService.getCaracteres().subscribe({
      next: (resp) => {
        this.caracter_list = resp;
      },
      error: (err) => {
        console.log('No existen datos de Caracter de Cargo');
      },
    });
  }

  obtenerEstadosCargos(): void {
    this.estadocargoService.getAllEstadosCargos().subscribe({
      next: (res) => {
        this.estadocargo_list = res;
      },
      error: (err) => {
        console.log('No existen datos de Estados de Cargos');
      },
    });
  }

  obtenerTransformaciones(): void {
    this.tr_service.getTransformaciones().subscribe({
      next: (resp) => {
        this.transformacion_list = resp;
      },
      error: (err) => {
        console.log('No existen transformaciones');
      },
    });
  }

  obtenerSubUnidadesOrganizativas(): void {
    this.subunidadService.obtenerSubunidades().subscribe({
      next: (resp) => {
        this.subunidades = resp;
      },
      error: (err) => {
        console.log('No hay unidades organizativas cargadas');
      },
    });
  }

  obtenerTodosPuntos(): void {
    this.puntoService.obtenerPuntos().subscribe({
      next: (resp) => {
        this.puntos = resp;
      },
      error: (err) => {
        console.log('No hay puntos creados');
      },
    });
  }

  obtenerTipoDocumento(): void {
    this.tipoDocumentoService.getTipoDocumentos().subscribe({
      next: (resp) => {
        this.tipodocumento_list = resp;
      },
      error: (err) => {
        console.log('No hay ningun tipo de documento cargado');
      },
    });
  }

  cargarFormPlanta(planta: Planta) {
    this.formPlanta.patchValue({
      idCargo: planta.cargoId.idCargo,
      tipoCargo: planta.cargoId.puntoId.tipo_cargo.cargo,
      subunidadOrganizativaId: planta.subunidadOrganizativaId.id,
      caracter: planta.cargoId.caracter?.id,
      estadoCargo: planta.cargoId.estadoCargo?.id,
      puntoId: planta.cargoId.puntoId?.id,
      transfCreacionId: planta.cargoId.transfCreacionId?.id,
      transfSupresionId: planta.cargoId.transfSupresionId?.id,
      tipoDocId: planta.agenteId.tipoDocId?.id,
      documento: planta.agenteId.documento,
      nombre: planta.agenteId.nombre,
      apellido: planta.agenteId.apellido,
      legajo: planta.agenteId.legajo,
      fechaNac:
        planta.agenteId.fechaNac != undefined
          ? formatDate(planta.agenteId.fechaNac, 'yyyy-MM-dd', 'en')
          : null,
      fechaMovimiento:
        planta.fechaMovimiento != undefined
          ? formatDate(planta.fechaMovimiento, 'yyyy-MM-dd', 'en')
          : null,
      motivoMovimiento: planta.motivoMovimiento ?? null,
      resolucionInicio: planta.resolucionInicio ?? null,
      fechaInicio:
        planta?.fechaInicio != undefined
          ? formatDate(planta.fechaInicio, 'yyyy-MM-dd', 'en')
          : null,
      resolucionFin: planta.resolucionFin,
      fechaFin:
        planta.fechaFin != undefined
          ? formatDate(planta.fechaFin, 'yyyy-MM-dd', 'en')
          : null,
      fechaCese:
        planta.fechaCese != undefined
          ? formatDate(planta.fechaCese, 'yyyy-MM-dd', 'en')
          : null,
      lic_Desde:
        planta.lic_Desde != undefined
          ? formatDate(planta.lic_Desde, 'yyyy-MM-dd', 'en')
          : null,
      lic_Hasta:
        planta.lic_Hasta != undefined
          ? formatDate(planta.lic_Hasta, 'yyyy-MM-dd', 'en')
          : null,
    });
  }

  editarPlanta() {
    // Datos del Agente
    console.log(
      'PUNTOSSS .... ' + JSON.stringify(this.reg_planta.cargoId.puntoId)
    );

    this.agente.id = this.reg_planta.agenteId.id;
    this.agente.tipoDocId = this.reg_planta.agenteId.tipoDocId;
    this.agente.documento = this.reg_planta.agenteId.documento;
    this.agente.nombre = this.reg_planta.agenteId.nombre;
    this.agente.apellido = this.reg_planta.agenteId.apellido;
    this.agente.fechaNac = this.reg_planta.agenteId.fechaNac;
    this.agente.domicilio = this.reg_planta.agenteId.domicilio;
    this.agente.legajo = this.reg_planta.agenteId.legajo;
    this.agente.telefono = this.reg_planta.agenteId.telefono;

    this.cargo.id = this.reg_planta.cargoId.id;
    this.cargo.caracter = this.reg_planta.cargoId.caracter;
    this.cargo.estadoCargo = this.estadoCargo;

    this.cargo.idCargo = this.reg_planta.cargoId.idCargo;
    this.cargo.puntoId = this.reg_planta.cargoId.puntoId;
    this.cargo.transfCreacionId = this.reg_planta.cargoId.transfCreacionId;
    this.cargo.transfSupresionId = this.reg_planta.cargoId.transfSupresionId;

    this.planta.id = this.reg_planta.id;

    this.planta.cargoId = this.cargo;
    this.planta.agenteId = this.agente;

    this.cambiarSubunidadOrganizativa();

    this.planta.subunidadOrganizativaId = this.subunidad;

    this.planta.fechaInicio = this.formPlanta.get('fechaInicio')?.value;
    this.planta.resolucionInicio =
      this.formPlanta.get('resolucionInicio')?.value;

    this.planta.fechaMovimiento = this.formPlanta.get('fechaMovimiento')?.value;
    this.planta.motivoMovimiento =
      this.formPlanta.get('motivoMovimiento')?.value;

    this.planta.fechaFin = this.formPlanta.get('fechaFin')?.value;
    this.planta.resolucionFin = this.formPlanta.get('resolucionFin')?.value;

    this.planta.fechaCese = this.formPlanta.get('fechaCese')?.value;
    this.planta.lic_Desde = this.formPlanta.get('lic_Desde')?.value;
    this.planta.lic_Hasta = this.formPlanta.get('lic_Hasta')?.value;

    console.log('Agente ... : ' + JSON.stringify(this.agente));
    console.log('Cargo ... : ' + JSON.stringify(this.cargo));
  }

  actualizarPlanta() {
    this.editarPlanta();

    this.plantaService.actualizarPlanta(this.planta).subscribe({
      next: (res) => {
        console.log('Planta actualizada correctamente');
      },
    });

    //this.cargoService.
  }

  getValue(event: any): number {
    return event.target.value.split(':')[1];
  }

  cambiarEstadoCargo() {
    //const id = this.getValue(e);
    const id = this.formPlanta.get('estadoCargo')?.value;

    this.estadocargoService.getEstadoCargoById(id).subscribe({
      next: (res) => {
        this.estadoCargo = res;
      },
    });
  }

  cambiarSubunidadOrganizativa(): void {
    const valor = this.formPlanta.get('subunidadOrganizativaId')?.value;

    this.subunidad = this.subunidades.find((v) => v.id == valor)!;
  }

  onCancelar() {
    this.route.navigate(['/app/planta']);
  }
}
