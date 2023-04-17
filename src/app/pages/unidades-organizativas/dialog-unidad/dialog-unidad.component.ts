import { UnidadOrganizativaService } from './../../../services/unidad-organizativa.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnidadOrganizativa } from 'src/app/models/unidad-organizativa';

@Component({
  selector: 'app-dialog-unidad',
  templateUrl: './dialog-unidad.component.html',
  styleUrls: ['./dialog-unidad.component.css'],
})
export class DialogUnidadComponent implements OnInit {
  unidadForm!: FormGroup;

  constructor(
    private unidadService: UnidadOrganizativaService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public unidad: UnidadOrganizativa
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.unidad != null) {
      this.cargarUnidad(this.unidad);
    }
  }

  cargarUnidad(unidad: UnidadOrganizativa): void {
    let value_unidad = {
      nombre: unidad.nombre,
      directorId: unidad.directorId,
      viceDirectorId: unidad.viceDirectorId,
    };

    this.unidadForm.setValue(value_unidad);
  }

  get nombreNoValido() {
    return (
      this.unidadForm.get('nombre')?.invalid &&
      this.unidadForm.get('nombre')?.touched
    );
  }

  get directorNoValido() {
    return (
      this.unidadForm.get('directorId')?.invalid &&
      this.unidadForm.get('directorId')?.touched
    );
  }

  get viceDirectorNoValido() {
    return (
      this.unidadForm.get('viceDirectorId')?.invalid &&
      this.unidadForm.get('viceDirectorId')?.touched
    );
  }

  createForm(): void {
    this.unidadForm = this.fb.group({
      nombre: ['', Validators.required],
      directorId: ['', Validators.required],
      viceDirectorId: ['', Validators.required],
    });
  }

  onSave() {
    this.unidad = {
      nombre: this.unidadForm.get('nombre')?.value,
      directorId: this.unidadForm.get('directorId')?.value,
      viceDirectorId: this.unidadForm.get('viceDirectorId')?.value,
      subunidades: [],
      ucargos: [],
    };
    this.unidadService.saveUnidad(this.unidad).subscribe({
      next: (res) => {
        console.log('El Dpto se guardo con exito');
      },
    });
  }

  onUpdate() {
    let unidad_update = {
      id: this.unidad.id,
      nombre: this.unidadForm.get('nombre')?.value,
      directorId: this.unidadForm.get('directorId')?.value,
      viceDirectorId: this.unidadForm.get('viceDirectorId')?.value,
      subunidades: [],
      ucargos: [],
    };

    this.unidadService.updateUnidad(unidad_update).subscribe({
      next: (res) => {
        console.log('La unidad se actualizo con exito');
      },
    });
  }
}
