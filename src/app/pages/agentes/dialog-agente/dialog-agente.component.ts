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
    private agenteService: AgenteService,
    private tpdocumentoService: TipoDocumentoService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string,
    public dialogRef: MatDialogRef<DialogAgenteComponent>,
    @Inject(MAT_DIALOG_DATA) public agente: Agente
  ) {
    this.createForm();

    if (this.agente != null) {
      this.agentForm.setValue({
        nombre: this.agente.nombre,
        apellido: this.agente.apellido,
        tipoDocId: this.agente.tipoDocId?.id,
        documento: this.agente.documento,
        fechaNac: moment(this.agente.fechaNac).format(),
        legajo: this.agente.legajo,
        domicilio: this.agente.domicilio,
        email: this.agente.email,
        telefono: this.agente.telefono,
      });

      // this.myDate = this.agente.fechaNac;
    }
  }

  ngOnInit(): void {
    //console.log('Fecha Nacimiento ' + this.myDate);

    this.getTipoDocumentos();

    // this.createForm();
  }

  createForm(): void {
    this.agentForm = this.fb.group({
      // id: [null],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoDocId: [null, Validators.required],
      documento: ['', Validators.required],
      fechaNac: ['', Validators.required],
      legajo: ['', Validators.required],
      domicilio: ['', Validators.required],
      email: ['', Validators.required],
      telefono: [''],
    });
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
    this.agenteService.saveAgente(this.agentForm.value).subscribe({
      next: (res) => {
        console.log('El agente se ha registrado exitosamente');
      },

      error: (err) => {
        console.log('No se pudo registrar al agente');
      },
    });
  }

  editAgente() {
    this.agenteService.actualizarAgente(this.agentForm.value).subscribe({
      next: (response) => {
        console.log('Edicion Agente ' + JSON.stringify(response));
      },
    });
  }

  updateDate(event: any) {
    // if (this.actualizacionAgente) {
    this.myDate = event.target.valueAsDate;
    // }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
