import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { PlantaService } from './../../../services/planta.service';
import { Planta } from './../../../models/planta';
import { Agente } from './../../../models/agente';

import { CargoService } from './../../../services/cargo.service';
import { TipoDocumento } from './../../../models/tipodocumento';
import { TipoDocumentoService } from './../../../services/tipo-documento.service';
import { PuntosDTO } from './../../../models/puntos-dto';
import { PuntoService } from './../../../services/punto.service';
import { UnidadOrganizativa } from './../../../models/unidad-organizativa';
import { UnidadOrganizativaService } from './../../../services/unidad-organizativa.service';
import { Transformacion } from './../../../models/transformacion';
import { EstadocargoService } from './../../../services/estadocargo.service';
import { EstadoCargoDTO } from './../../../models/estadocargo-dto';
import { caracterDTO } from './../../../models/caracter-dto';
import { CaracterService } from './../../../services/caracter.service';
import { TipoCargosService } from './../../../services/tipo-cargos.service';
import { TransformacionesService } from './../../../services/transformaciones.service';
import { AgenteService } from 'src/app/services/agente.service';
import { Component, OnInit } from '@angular/core';

import { Cargo } from 'src/app/models/cargo';

@Component({
  selector: 'app-planta-nueva',
  templateUrl: './planta-nueva.component.html',
  styleUrls: ['./planta-nueva.component.css'],
  /*  providers: [
  
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ], */
})
export class PlantaNuevaComponent implements OnInit {
  formCargo!: FormGroup;

  formAgente!: FormGroup;

  formPlanta!: FormGroup;

  caracter_list: caracterDTO[] = [];

  estadocargo_list: EstadoCargoDTO[] = [];

  transformacion_list: Transformacion[] = [];

  unidadesorganizativa_list: UnidadOrganizativa[] = [];

  puntos_list: PuntosDTO[] = [];

  tipodocumento_list: TipoDocumento[] = [];

  cargo!: Cargo;

  agente!: Agente;

  planta!: Planta;

  date = new Date();

  //fechanac = new FormControl(new Date());

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
    private fb: FormBuilder
  ) {}

  //caracterCargos

  ngOnInit(): void {
    this.getAllCaracteres();
    this.getAllEstadosCargos();
    this.getAllTransformaciones();
    this.getAllUnidadesOrganizativas();
    // this.getAllPuntos();
    this.getAllTipoDocumento();

    this.buscarPlantaByCodigo();

    this.createForm();
  }

  private createForm() {
    this.formCargo = this.fb.group({
      idCargo: [0, Validators.required],
      tipoCargo: [null],
      unidadOrganizativaId: [null],
      caracter: [null, Validators.required],
      estadoCargo: [null, Validators.required],
      puntoId: [null],
      transfCreacionId: [null, Validators.required],
      transfSupresionId: [null],
    });

    this.formAgente = this.fb.group({
      tipoDocId: [null],
      documento: [null, Validators.required],
      nombre: [null],
      apellido: [null],
      legajo: [null],
      fechaNac: [null],
      fechaMovimiento: [null],
      motivoMovimiento: [''],
      resolucionInicio: [''],
      fechaInicio: [null],
      resolucionFin: [''],
      fechaFin: [null],
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

  buscarPlantaByCodigo(): void {
    this.plantaService.getPlantaByCargo(8585).subscribe({
      next: (res) => {
        this.planta = res;
        console.log('Valor de Planta de Cargo ' + JSON.stringify(this.planta));
      },
    });
  }

  buscarCargos(): void {
    if (this.formCargo.get('idCargo')?.value != undefined) {
      this.cargoService.getCargoByCodigo(8585).subscribe({
        next: (res) => {
          this.cargo = res;

          if (this.cargo != undefined) {
            this.formCargo.patchValue({
              tipoCargo: this.cargo.puntoId.tipo_cargo.cargo,
              caracter: this.cargo.caracter.id,
              estadoCargo: this.cargo.estadoCargo.id,
              transfCreacionId: this.cargo.transfCreacionId.id,
              transfSupresionId:
                this.cargo.transfSupresionId !== null
                  ? this.cargo.transfSupresionId.id
                  : 0,
              unidadOrganizativaId: this.cargo.unidadOrganizativaId.id,
              puntoId:
                this.cargo.puntoId.id +
                ' ' +
                this.cargo.puntoId.tipo_cargo.cargo +
                ' ' +
                this.cargo.puntoId.puntos_disponibles,
            });

            console.log('Cargo ' + JSON.stringify(this.cargo));
          }
        },
      });
    }
  }

  buscarAgente(): void {
    if (this.formAgente.get('documento')?.value != undefined) {
      let documento = this.formAgente.get('documento')?.value;
      this.agenteService.getAgenteByDocumento(documento).subscribe({
        next: (res) => {
          this.agente = res;
          //     this.fechanac = new FormControl(new Date(this.agente.fechaNac));

          this.formAgente.patchValue({
            tipoDocId: this.agente.tipoDocId?.id,
            nombre: this.agente.nombre,
            apellido: this.agente.apellido,
            documento: this.agente.documento,
            fechaNac: formatDate(this.agente.fechaNac, 'yyyy-MM-dd', 'en'), // moment(this.agente.fechaNac).format(),
            legajo: this.agente.legajo,
          });

          console.log('Agente ' + JSON.stringify(this.agente));
        },
      });
    }
  }
}
