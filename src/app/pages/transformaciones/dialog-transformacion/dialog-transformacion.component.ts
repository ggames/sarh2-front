import { ToastrService } from 'ngx-toastr';
import { Transformacion } from './../../../models/transformacion';
import { DialogAgenteComponent } from './../../agentes/dialog-agente/dialog-agente.component';
import { TransformacionesService } from './../../../services/transformaciones.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-transformacion',
  templateUrl: './dialog-transformacion.component.html',
  styleUrls: ['./dialog-transformacion.component.css'],
})
export class DialogTransformacionComponent implements OnInit {
  transformacionForm!: FormGroup;

  constructor(
    private transformacionesService: TransformacionesService,
    private toastrSrv: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAgenteComponent>,
    @Inject(MAT_DIALOG_DATA) public transformacion: Transformacion
  ) {
    this.createForm();

    if (this.transformacion != null) {
      let values = {
        numeroResolucion: this.transformacion.numeroResolucion,
        resultadoTransformacion: this.transformacion.resultadoTransformacion,
      };
      this.transformacionForm.setValue(values);
    }
  }

  ngOnInit(): void {}

  get numeroResolucionNoValido() {
    return (
      this.transformacionForm.get('numeroResolucion')?.invalid &&
      this.transformacionForm.get('numeroResolucion')?.touched
    );
  }

  get resultadoTransformacionNoValido() {
    return (
      this.transformacionForm.get('resultadoTransformacion')?.invalid &&
      this.transformacionForm.get('resultadoTransformacion')?.touched
    );
  }

  createForm() {
    this.transformacionForm = this.fb.group({
      numeroResolucion: ['', Validators.required],
      resultadoTransformacion: ['', Validators.required],
    });
  }

  addTransformacion() {
    this.transformacionesService
      .saveTransformacion(this.transformacionForm.value)
      .subscribe({
        next: (response) => {
          this.toastrSrv.success(
            'La transformación se creo con exito',
            'Fich App'
          );
          console.log('Edicion Agente ' + JSON.stringify(response));
        },
        error: (err) => {
          this.toastrSrv.error(
            'Se produjo un error al actualizar la transformación',
            'Fich App'
          );
        },
      });
  }

  editTransformacion() {
    this.transformacionesService
      .updateTransformacion(this.transformacionForm.value)
      .subscribe({
        next: (response) => {
          this.toastrSrv.success(
            'La transformación se actualizo con exito',
            'Fich App'
          );
          //console.log('Edicion Agente ' + JSON.stringify(response));
        },
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
