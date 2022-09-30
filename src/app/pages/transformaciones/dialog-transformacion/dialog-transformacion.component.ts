import { Transformacion } from './../../../models/transformacion';
import { DialogAgenteComponent } from './../../agentes/dialog-agente/dialog-agente.component';
import { TransformacionesService } from './../../../services/transformaciones.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-transformacion',
  templateUrl: './dialog-transformacion.component.html',
  styleUrls: ['./dialog-transformacion.component.css'],
})
export class DialogTransformacionComponent implements OnInit {
  transformacionForm = new FormGroup({
    id: new FormControl(0),
    numeroResolucion: new FormControl('', Validators.required),
    resultadoTransformacion: new FormControl('', Validators.required),
  });

  constructor(
    private transformacionesService: TransformacionesService,
    public dialogRef: MatDialogRef<DialogAgenteComponent>,
    @Inject(MAT_DIALOG_DATA) public transformacion: Transformacion
  ) {
    if (this.transformacion != null) {
      let values = {
        id: this.transformacion.id!,
        numeroResolucion: this.transformacion.numeroResolucion!,
        resultadoTransformacion: this.transformacion.resultadoTransformacion!,
      };
      this.transformacionForm.setValue(values);
    }
  }

  ngOnInit(): void {}

  addTransformacion() {
    this.transformacionesService
      .saveTransformacion(this.transformacionForm.value)
      .subscribe({
        next: (response) => {
          console.log('Edicion Agente ' + JSON.stringify(response));
        },
      });
  }

  editTransformacion() {
    this.transformacionesService
      .updateTransformacion(this.transformacionForm.value)
      .subscribe({
        next: (response) => {
          console.log('Edicion Agente ' + JSON.stringify(response));
        },
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
