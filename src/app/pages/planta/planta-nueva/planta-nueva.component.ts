import { EstadoCargo } from './../../../models/estadoCargo';
import { Mensaje } from './../../../models/mensaje';
import { Response } from './../../../models/response';
import { HttpClient } from '@angular/common/http';
import { iif, of, mergeMap, filter, find, tap, map } from 'rxjs';
import { SubunidadOrganizativaService } from './../../../services/subunidad-organizativa.service';
import { SubUnidadOrganizativa } from './../../../models/subunidad-organizativa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { PlantaService } from './../../../services/planta.service';
import { Planta } from './../../../models/planta';
import { Agente } from './../../../models/agente';
import { Cargo } from './../../../models/cargo';

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

  subunidades: SubUnidadOrganizativa[] = [];

  puntos: PuntosDTO[] = [];

  tipodocumento_list: TipoDocumento[] = [];

  cargo!: Cargo;

  agente!: Agente;

  transfSupresion!: Transformacion;

  subunidad!: SubUnidadOrganizativa;

  planta: Planta = new Planta();

  plantas_cod: Planta[] = [];

  date = new Date();

  mensaje!: string;

  existe_cargo = false;

  existe_agente = false;

  block_agente = false;

  submitted = false;

  //fechanac = new FormControl(new Date());

  constructor(
    private plantaService: PlantaService,
    private cargoService: CargoService,
    private agenteService: AgenteService,
    private tr_service: TransformacionesService,
    private tipoCargoService: TipoCargosService,
    private caracterService: CaracterService,
    private estadocargoService: EstadocargoService,
    private subunidadOrganizativaService: SubunidadOrganizativaService,
    private puntoService: PuntoService,
    private tipoDocumentoService: TipoDocumentoService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  //caracterCargos

  ngOnInit(): void {
    this.obtenerCaracteres();
    this.obtenerEstadosCargos();
    this.obtenerTransformaciones();
    this.obtenerSubUnidadesOrganizativas();
    this.obtenerPuntos();
    this.obtenerTipoDocumento();

    this.createForm();
  }

  private createForm() {
    this.formCargo = this.fb.group({
      idCargo: ['', Validators.required],
      tipoCargo: [null],
      subunidadOrganizativaId: [null, Validators.required],
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
      fechaNac: [''],
      fechaMovimiento: [null],
      motivoMovimiento: [''],
      resolucionInicio: [''],
      fechaInicio: [null],
      resolucionFin: [''],
      fechaFin: [null],
    });
  }

  get f() {
    return this.formCargo.controls;
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
    this.estadocargoService
      .getAllEstadosCargos()
      .pipe(map((estados) => estados.filter((v) => v.id != 1 && v.id != 2)))
      .subscribe({
        next: (res) => {
          console.log(JSON.stringify(res));
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
    this.subunidadOrganizativaService.obtenerSubunidades().subscribe({
      next: (resp) => {
        this.subunidades = resp;
      },
      error: (err) => {
        console.log('No hay unidades organizativas cargadas');
      },
    });
  }

  obtenerSubunidades(unidad: number): void {
    this.subunidades = this.subunidades.filter(
      (v) => v.unidadOrganizativaId.id == unidad
    );
  }

  obtenerPuntos(): void {
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

  buscar(): void {
    const nro_cargo = this.formCargo.get('idCargo')?.value;

    this.plantaService
      .getPlantaByCargo(nro_cargo)
      .pipe(
        mergeMap((v) =>
          iif(
            () => v != null,
            of(`El cargo ${nro_cargo} se encuentra activo`),
            this.cargoService
              .getCargoByCodigo(nro_cargo)
              .pipe(
                mergeMap((v1) =>
                  iif(
                    () => v1 !== null,
                    of(v1),
                    of(`No existe el cargo con el Nro ${nro_cargo}`)
                  )
                )
              )
          )
        )
      )
      .subscribe((res: any) => {
        if (typeof res == 'object') {
          this.existe_cargo = false;
          this.block_agente = true;
          this.cargarFormCargo(res);
        }
        if (typeof res == 'string') {
          this.existe_cargo = true;
          this.block_agente = false;
          this.mensaje = res;
        }
      });
  }

  cargarFormCargo(cargo: Cargo): void {
    const id = cargo.unidadOrganizativaId.id!;
    this.obtenerSubunidades(id);

    this.formCargo.patchValue({
      tipoCargo: cargo.puntoId.tipo_cargo.cargo,
      caracter: cargo.caracter.id,
      estadoCargo: cargo.estadoCargo.id,
      transfCreacionId: cargo.transfCreacionId.id,
      transfSupresionId:
        cargo.transfSupresionId !== null ? cargo.transfSupresionId.id : 0,
      // subunidadOrganizativaId: cargo.subunidadOrganizativaId.id,
      puntoId: cargo.puntoId.id,
    });
    this.cargo = cargo;
  }

  cargarFormAgente(agente: any): void {
    this.formAgente.patchValue({
      tipoDocId: agente.tipoDocId?.id,
      nombre: agente.nombre,
      apellido: agente.apellido,
      documento: agente.documento,
      fechaNac: formatDate(agente.fechaNac, 'yyyy-MM-dd', 'en'), // moment(this.agente.fechaNac).format(),
      legajo: agente.legajo,
    });
    this.agente = agente;
  }

  buscarAgente(): void {
    if (this.formAgente.get('documento')?.value != undefined) {
      let documento = this.formAgente.get('documento')?.value;
      this.agenteService
        .getAgenteByDocumento(documento)
        .pipe(
          mergeMap((v) =>
            iif(() => v != null, of(v), of(`El DNI ${documento} no existe`))
          )
        )
        .subscribe({
          next: (res) => {
            if (typeof res == 'object') {
              this.existe_agente = false;
              this.cargarFormAgente(res);
            } else {
              this.existe_agente = true;
              this.mensaje = res;
            }

            console.log('Agente ' + JSON.stringify(this.agente));
          },
        });
    }
  }

  cambiarTransformacionSupr() {
    const _id = this.formPlanta.get('transfSupresionId')?.value;
    this.transfSupresion = this.transformacion_list.find((transf) => {
      transf.id = _id;
    })!;
  }

  cambiarSubunidadOrganizativa() {
    const id = this.formCargo.get('subunidadOrganizativaId')?.value;

    console.log('Codigo Materia ' + id);

    this.subunidad = this.subunidades.find((sub) => sub.id == id)!;
    console.log('MATERIA ELEGIDA  ' + JSON.stringify(this.subunidad));
  }

  onSave() {
    this.submitted = true;

    if (this.formAgente.invalid) {
      return;
    }
    if (this.formCargo.invalid) {
      return;
    }

    console.log('Carogoooooooo ' + JSON.stringify(this.cargo));
    this.cargo.transfSupresionId = this.transfSupresion;
    this.planta.cargoId = this.cargo;
    this.planta.agenteId = this.agente;
    this.planta.subunidadOrganizativaId = this.subunidad;
    this.planta.fechaMovimiento =
      this.formAgente.get('fechaMovimiento')?.value != undefined
        ? formatDate(
            this.formAgente.get('fechaMovimiento')?.value,
            'yyyy-MM-dd',
            'en'
          )
        : null!;
    this.planta.motivoMovimiento =
      this.formAgente.get('motivoMovimiento')?.value;
    this.planta.fechaInicio =
      this.formAgente.get('fechaInicio')?.value != undefined
        ? formatDate(
            this.formAgente.get('fechaInicio')?.value,
            'yyyy-MM-dd',
            'en'
          )
        : null!;
    this.planta.resolucionInicio =
      this.formAgente.get('resolucionInicio')?.value;
    this.planta.fechaFin =
      this.formAgente.get('fechaFin')?.value != undefined
        ? formatDate(this.formAgente.get('fechaFin')?.value, 'yyyy-MM-dd', 'en')
        : null!;

    this.planta.resolucionFin = this.formAgente.get('resolucionFin')?.value;

    this.plantaService.crearPlanta(this.planta).subscribe({
      next: (res) => {
        console.log('La planta se guardo con exito ');
      },
    });
  }
}
