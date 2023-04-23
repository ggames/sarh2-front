import { formatDate } from '@angular/common';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import { MY_DATE_FORMAT } from './../../../utils/my-date-format';

import { Component, Inject, OnInit, LOCALE_ID } from '@angular/core';

import { Agente } from './../../../models/agente';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AgenteService } from 'src/app/services/agente.service';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { TipoDocumento } from './../../../models/tipodocumento';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM-YYYY',
  },
};

@Component({
  selector: 'app-dialog-agente',
  templateUrl: './dialog-agente.component.html',
  styleUrls: ['./dialog-agente.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class DialogAgenteComponent implements OnInit {
  //Lista de tipos de documentos
  tiposdocumento: TipoDocumento[] = [];

  tipodocumento!: TipoDocumento; //= new TipoDocumento('', '');

  myDate!: string;

  actualizacionAgente!: boolean;

  date = new FormControl(moment());

  agentForm!: FormGroup;
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private toastrSrv: ToastrService,
    private agenteService: AgenteService,
    private tpdocumentoService: TipoDocumentoService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string,
    public dialogRef: MatDialogRef<DialogAgenteComponent>,
    @Inject(MAT_DIALOG_DATA) public agente: Agente
  ) {
    this.dateAdapter.setLocale('es-Es');
  }

  ngOnInit(): void {
    //console.log('Fecha Nacimiento ' + this.myDate);

    this.getTipoDocumentos();

    this.createForm();

    if (this.agente != null) {
      this.cargarAgente(this.agente);
    }
  }

  cargarAgente(agente: Agente): void {
    let values_agente = {
      nombre: this.agente.nombre,
      apellido: this.agente.apellido,
      tipoDocId: this.agente.tipoDocId?.id,
      documento: this.agente.documento,
      esFallecido: this.agente.esFallecido,
      fechaBaja:
        this.agente.fechaBaja != undefined
          ? formatDate(this.agente.fechaBaja, 'yyyy-MM-dd', 'en')
          : '',
      fechaNac:
        this.agente.fechaNac != undefined
          ? formatDate(this.agente.fechaNac, 'yyyy-MM-dd', 'en')
          : '', //moment(this.agente.fechaNac).format(),
      legajo: this.agente.legajo,
      domicilio: this.agente.domicilio,
      email: this.agente.email,
      telefono: this.agente.telefono,
    };

    this.tipodocumento = this.agente.tipoDocId;
    this.agentForm.setValue(values_agente);
  }

  createForm(): void {
    this.agentForm = this.fb.group({
      // id: [null],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoDocId: [null, Validators.required],
      documento: ['', Validators.required],
      esFallecido: [null],
      fechaBaja: [''],
      fechaNac: ['', Validators.required],
      legajo: ['', Validators.required],
      domicilio: ['', Validators.required],
      email: ['', Validators.required],
      telefono: [''],
    });
  }

  get nombreNoValido() {
    return (
      this.agentForm.get('nombre')?.valid &&
      this.agentForm.get('nombre')?.touched
    );
  }

  get fechaNacimientoNoValido() {
    return (
      this.agentForm.get('fechaNac')?.invalid &&
      this.agentForm.get('fechaNac')?.touched
    );
  }

  getTipoDocumentos() {
    this.tpdocumentoService.getTipoDocumentos().subscribe({
      next: (res) => {
        this.tiposdocumento = res;
      },

      error: (err) => {
        console.log('Error en la carga Tipo documento');
      },
    });
  }

  addAgente() {
    let agente_nuevo = {
      nombre: this.agentForm.get('nombre')?.value,
      apellido: this.agentForm.get('apellido')?.value,
      tipoDocId: this.tipodocumento,
      documento: this.agentForm.get('documento')?.value,
      esFallecido: this.agentForm.get('esFallecido')?.value,
      fechaBaja:
        this.agentForm.get('fechaBaja')?.value != undefined
          ? formatDate(
              this.agentForm.get('fechaBaja')?.value,
              'yyyy-MM-dd',
              'en'
            )
          : '',
      fechaNac:
        this.agentForm.get('fechaNac')?.value != undefined
          ? formatDate(
              this.agentForm.get('fechaNac')?.value,
              'yyyy-MM-dd',
              'en'
            )
          : '', //moment(this.agentForm.get('fechaNac')?.value).format(),
      legajo: this.agentForm.get('legajo')?.value,
      domicilio: this.agentForm.get('domicilio')?.value,
      email: this.agentForm.get('email')?.value,
      telefono: this.agentForm.get('telefono')?.value,
    };
    this.agenteService.saveAgente(agente_nuevo).subscribe({
      next: (res) => {
        console.log('El agente se ha registrado exitosamente');
      },

      error: (err) => {
        console.log('No se pudo registrar al agente');
      },
    });
  }

  editAgente() {
    console.log('Fecha de BAJA  ' + this.agentForm.get('fecbaBaja')?.value);

    let agente_update = {
      id: this.agente.id,
      nombre: this.agentForm.get('nombre')?.value,
      apellido: this.agentForm.get('apellido')?.value,
      tipoDocId: this.tipodocumento,
      documento: this.agentForm.get('documento')?.value,
      esFallecido: this.agentForm.get('esFallecido')?.value,
      fechaBaja: this.agentForm.get('fechaBaja')?.value,
      fechaNac:
        this.agentForm.get('fechaNac')?.value != undefined
          ? formatDate(
              this.agentForm.get('fechaNac')?.value,
              'yyyy-MM-dd',
              'en'
            )
          : '', //moment(this.agentForm.get('fechaNac')?.value).format(),
      legajo: this.agentForm.get('legajo')?.value,
      domicilio: this.agentForm.get('domicilio')?.value,
      email: this.agentForm.get('email')?.value,
      telefono: this.agentForm.get('telefono')?.value,
    };

    console.log('DATOS DE AGENTE ' + JSON.stringify(agente_update));

    this.agenteService.actualizarAgente(agente_update).subscribe({
      next: (response) => {
        this.toastrSrv.success(
          'Los datos del agente se actualizo con existo',
          'App Fich'
        );
        console.log('Edicion Agente ' + JSON.stringify(response));
      },
    });
  }

  cambiarTipoDocumento(id: any): void {
    const _id = this.getValue(id);

    this.tpdocumentoService.getTipoDocumentoById(_id).subscribe({
      next: (res) => {
        this.tipodocumento = res;
      },
    });
  }

  updateDate(event: any) {
    // if (this.actualizacionAgente) {
    this.myDate = event.target.valueAsDate;
    // }
  }

  getValue(event: any): number {
    return event.target.value.split(':')[1];
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
