import { PuntosDTO } from './../../../../models/puntos-dto';
import { PuntoService } from './../../../../services/punto.service';
import { PuntoOrigen } from 'src/app/models/punto-origen';
import { Puntos } from 'src/app/models/puntos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogpunto',
  templateUrl: './dialogpunto.component.html',
  styleUrls: ['./dialogpunto.component.css'],
})
export class DialogpuntoComponent implements OnInit {
  public punto!: Puntos | null;

  public puntos: PuntosDTO[] = [];

  public origenes: PuntosDTO[] = [];

  public nCantidad = 1;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogpuntoComponent>,
    public puntoService: PuntoService
  ) {}

  public puntoForm = this.formBuilder.group({
    codigoCargo: [null, [Validators.required]],
    nombreCargo: [null, [Validators.required]],
    dedicacionCargo: [null, [Validators.required]],
    cantidad_puntos: [null, [Validators.required, Validators.min(1)]],
  });

  getErrorMessage(field: string): string {
    let message = '';
    if (this.puntoForm.get(field)?.hasError('required')) {
      message = 'Debe ingresar un valor';
    } else if (this.puntoForm.get(field)?.hasError('min')) {
      message = 'Al menos 1 cantidad';
    }
    return message;
  }

  isValidField(field: string): boolean {
    let valido = false;

    if (
      (this.puntoForm.get(field)?.touched ||
        this.puntoForm.get(field)?.dirty) &&
      !this.puntoForm.get(field)?.valid
    ) {
      valido = true;
    }
    return valido;
  }

  getPuntos() {
    this.puntoService.getPuntos().subscribe({
      next: (res) => {
        this.puntos = res;
      },
      error: (err) => {
        console.log('Error en la carga');
      },
    });
  }
  close() {
    this.dialogRef.close();
  }

  addPunto() {}

  onChange(idPunto: number) {
    this.puntoService.getObtener(idPunto).subscribe({
      next: (res) => {
        this.punto = res;
      },
      error: (err) => {
        console.log('Error ' + err);
      },
    });
  }
  ngOnInit(): void {
    this.getPuntos();
  }
}
