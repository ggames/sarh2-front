import { ActivatedRoute } from '@angular/router';

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

  unidadesorganizativa_list: UnidadOrganizativa[] = [];

  puntos_list: PuntosDTO[] = [];

  tipodocumento_list: TipoDocumento[] = [];

  constructor(
    private plantaService: PlantaService,
    private cargoService: CargoService,
    private agenteService: AgenteService,
    private tr_service: TransformacionesService,
    private tipoCargoService: TipoCargosService,
    private caracterService: CaracterService,
    private estadocargoService: EstadocargoService,
    private unidadOrganizativaService: UnidadOrganizativaService,
    private puntoService: PuntoService,
    private tipoDocumentoService: TipoDocumentoService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getAllCaracteres();
    this.getAllEstadosCargos();
    this.getAllTransformaciones();
    this.getAllUnidadesOrganizativas();
    // this.getAllPuntos();
    this.getAllTipoDocumento();

    this.activatedRoute.params.subscribe((params: any) => {
      const _id = params?.id;
      if (_id !== undefined && typeof _id == 'number') {
        console.log('Valor del parametro ' + _id);
      }

      this.cargarPlanta(_id);
    });
  }

  cargarPlanta(id: number) {
    this.plantaService.getPlantaById(id).subscribe({
      next: (planta) => {
        this.reg_planta = planta;
        console.log('PLANTA PERMANENTE ' + JSON.stringify(this.reg_planta));

        this.cargarFormPlanta(this.reg_planta);
      },
    });
  }

  createForm() {
    this.formPlanta = this.fb.group({
      idCargo: [0, Validators.required],
      tipoCargo: [null],
      unidadOrganizativaId: [null],
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
    });
  }

  cargarFormPlanta(planta: Planta) {
    this.formPlanta.patchValue({
      idCargo: planta.cargoId.idCargo,
      tipoCargo: planta.cargoId.puntoId.tipo_cargo.cargo,
      unidadOrganizativaId: planta.cargoId.unidadOrganizativaId?.id,
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
      fechaNac: formatDate(planta.agenteId.fechaNac, 'yyyy-MM-dd', 'en'),
      fechaMovimiento: formatDate(planta.fechaMovimiento, 'yyyy-MM-dd', 'en'),
      motivoMovimiento: planta.motivoMovimiento ?? null,
      resolucionInicio: planta.resolucionInicio ?? null,
      fechaInicio: planta?.fechaInicio,
      resolucionFin: planta.resolucionFin,
      fechaFin: planta.fechaFin,
    });
  }

  getAllCaracteres(): void {
    this.caracterService.getCaracteres().subscribe({
      next: (resp) => {
        this.caracter_list = resp;
      },
      error: (err) => {
        console.log('No existen datos de Caracter de Cargo');
      },
    });
  }

  getAllEstadosCargos(): void {
    this.estadocargoService.getAllEstadosCargos().subscribe({
      next: (res) => {
        this.estadocargo_list = res;
      },
      error: (err) => {
        console.log('No existen datos de Estados de Cargos');
      },
    });
  }
  getAllTransformaciones(): void {
    this.tr_service.getTransformaciones().subscribe({
      next: (resp) => {
        this.transformacion_list = resp;
      },
      error: (err) => {
        console.log('No existen transformaciones');
      },
    });
  }

  getAllUnidadesOrganizativas(): void {
    this.unidadOrganizativaService.getUnidades().subscribe({
      next: (resp) => {
        this.unidadesorganizativa_list = resp;
      },
      error: (err) => {
        console.log('No hay unidades organizativas cargadas');
      },
    });
  }

  getAllPuntos(): void {
    this.puntoService.getPuntos(true, [3, 5]).subscribe({
      next: (resp) => {
        this.puntos_list = resp;
      },
      error: (err) => {
        console.log('No hay puntos creados');
      },
    });
  }

  getAllTipoDocumento(): void {
    this.tipoDocumentoService.getTipoDocumentos().subscribe({
      next: (resp) => {
        this.tipodocumento_list = resp;
      },
      error: (err) => {
        console.log('No hay ningun tipo de documento cargado');
      },
    });
  }
}
