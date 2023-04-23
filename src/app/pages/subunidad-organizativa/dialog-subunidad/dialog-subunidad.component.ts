import { UnidadOrganizativa } from './../../../models/unidad-organizativa';
import { SubUnidadOrganizativa } from './../../../models/subunidad-organizativa';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnidadOrganizativaService } from './../../../services/unidad-organizativa.service';
import { SubunidadOrganizativaService } from './../../../services/subunidad-organizativa.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-subunidad',
  templateUrl: './dialog-subunidad.component.html',
  styleUrls: ['./dialog-subunidad.component.css'],
})
export class DialogSubunidadComponent implements OnInit {
  SubUnidadForm!: FormGroup;

  unidadesOrganizativas: UnidadOrganizativa[] = [];

  unidad_organizativa!: UnidadOrganizativa;

  constructor(
    private subunidadService: SubunidadOrganizativaService,
    private unidadService: UnidadOrganizativaService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public subunidad: SubUnidadOrganizativa
  ) {}

  ngOnInit(): void {
    this.cargarUnidadesOrganizativas();

    this.createForm();

    if (this.subunidad != null) {
      this.cargarSubunidad(this.subunidad);
    }
  }

  cargarSubunidad(subunidad: SubUnidadOrganizativa): void {
    let values_subunidad = {
      codigoGuarani: subunidad.codigoGuarani,
      nombre: subunidad.nombre,
      unidadOrganizativaId: subunidad.unidadOrganizativaId.id,
    };

    this.unidad_organizativa = subunidad.unidadOrganizativaId;
    this.SubUnidadForm.setValue(values_subunidad);
  }

  cargarUnidadesOrganizativas(): void {
    this.unidadService.getUnidades().subscribe({
      next: (res) => {
        this.unidadesOrganizativas = res;
      },
    });
  }

  createForm(): void {
    this.SubUnidadForm = this.fb.group({
      codigoGuarani: [0, Validators.required],
      nombre: ['', Validators.required],
      unidadOrganizativaId: [null, Validators.required],
    });
  }

  get nombreNoValido() {
    return (
      this.SubUnidadForm.get('nombre')?.invalid &&
      this.SubUnidadForm.get('nombre')?.touched
    );
  }

  get UnidadNoValido() {
    return (
      this.SubUnidadForm.get('unidadOrganizativaId')?.invalid &&
      this.SubUnidadForm.get('unidadOrganizativaId')?.touched
    );
  }

  get codigoGuaraniNoValido() {
    return (
      this.SubUnidadForm.get('codigoGuarani')?.invalid &&
      this.SubUnidadForm.get('codigoGuarani')?.touched
    );
  }

  getValue(event: any): number {
    return event.target.value.split(':')[1];
  }

  cambiarDepartamento(id: any): void {
    const _id = this.getValue(id);
    this.unidadService.getUnidad(_id).subscribe({
      next: (res) => {
        this.unidad_organizativa = res;
        console.log('UNIDAD ' + JSON.stringify(this.unidad_organizativa));
      },
    });
  }

  onSave(): void {
    this.subunidad = {
      codigoGuarani: this.SubUnidadForm.get('codigoGuarani')?.value,
      nombre: this.SubUnidadForm.get('nombre')?.value,
      unidadOrganizativaId: this.unidad_organizativa,
    };

    this.subunidadService.save(this.subunidad).subscribe({
      next: (res) => {
        console.log('La materia se creo con exito');
      },
    });
  }

  onUpdate(): void {
    let subunidad_update = {
      id: this.subunidad.id,
      codigoGuarani: this.SubUnidadForm.get('codigoGuarani')?.value,
      nombre: this.SubUnidadForm.get('nombre')?.value,
      unidadOrganizativaId: this.unidad_organizativa,
    };

    this.subunidadService.update(subunidad_update).subscribe({
      next: (res) => {
        console.log('La materia se actualizo con exito');
      },
    });
  }
}
