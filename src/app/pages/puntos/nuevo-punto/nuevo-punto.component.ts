import { Puntos } from './../../../models/puntos';
import { PuntoOrigen } from './../../../models/punto-origen';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { PuntoService } from '../../../services/punto.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-puntos',
  templateUrl: './nuevo-punto.component.html',
  styleUrls: ['./nuevo-punto.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapse', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapse',
        animate('225ms cubic-bezier(0.4, 0.8, 0.2, 1)')
      ),
    ]),
  ],
})
export class NuevoPuntoComponent implements OnInit {
  puntoForm!: FormGroup;

  public punto_nuevo!: Puntos;

  puntoOrigenList: Puntos[] = [];

  puntosChecked: Puntos[] = [];

  puntosOrigenElegido: PuntoOrigen[] = [];

  constructor(private puntoService: PuntoService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.puntoForm = this.fb.group({
      id: [''],
      codigoCargo: ['', Validators.required],
      nombreCargo: ['', Validators.required],
      dedicacionCargo: ['', Validators.required],
      cantidad_puntos: ['', Validators.required],
    });

    this.puntoService.getPuntos().subscribe({
      next: (puntos) => {
        this.puntoOrigenList = puntos;
        //  console.log('LISTA DE PUNTOS ' + JSON.stringify(this.puntoOrigenList));
      },
      error: (err) => {
        console.log('Error carga');
      },
    });
  }

  isAllCheckboxChecked() {
    return this.puntoOrigenList.every((p) => p.checked);
  }

  checkAllCheckbox(e: any): void {
    this.puntoOrigenList.forEach((x) => (x.checked = e.target.checked));
  }

  onCheckboxChange(index: number): void {
    if (this.puntoOrigenList[index].checked == true) {
      this.puntosChecked.push(this.puntoOrigenList[index]);
    } else {
      const index1 = this.puntosChecked.findIndex(
        (x) => x.id === this.puntoOrigenList[index].id
      );

      this.puntosChecked.splice(index1, 1);
    }
    //console.log('Puntos Origen  ' + JSON.stringify(this.puntosChecked));
  }

  reducirCantidadPuntosDB() {
    let punto;
    this.puntosOrigenElegido;

    this.puntosOrigenElegido.forEach((element) => {
      this.puntoService.getObtener(element.puntoOrigenId).subscribe({
        next: (res) => {
          punto = res;

          if (punto !== null) {
            punto.cantidad_puntos =
              punto.cantidad_puntos - element.cantOcupados;
            console.error('CANTIDAD ACTUALIZADA ' + element.cantOcupados);

            this.puntoService.updatePunto(punto).subscribe({
              next: (res) => {
                console.log('La actualización se realizo con exito ' + res);
              },
              error: (err) => {
                console.log('Error en la actualización ' + JSON.stringify(err));
              },
            });
            /// REALIZAR EL SERVICIO DE ACTUALIZACION DE PUNTOS SERVICIO
          }
        },
        error: (err) => {},
      });
    });
  }

  changeCantidad(index: number, e: any) {
    if (this.puntoOrigenList[index].checked == true) {
      this.puntoOrigenList.forEach((x) => (x.cant_ocupado = e.target.value));
      if (
        this.puntoOrigenList[index].cant_ocupado >
        this.puntoOrigenList[index].cantidad_puntos
      ) {
        console.error('Cantidad de puntos excede a la disponible');
      }
    } else {
      this.puntoOrigenList[index].cantidad_puntos -=
        this.puntoOrigenList[index].cant_ocupado;
      console.log(
        'PUNTOS ELEGIDOS ' + JSON.stringify(this.puntoOrigenList[index])
      );
    }
  }

  addPuntosOrigenes() {
    this.puntoOrigenList.forEach((x) => {
      if (x.checked == true) {
        this.puntosOrigenElegido.push({
          puntoOrigenId: x.id,
          puntoId: this.puntoForm.value,
          cantOcupados: x.cant_ocupado,
        });
      }
    });

    this.punto_nuevo = {
      id: 0,
      codigoCargo: this.puntoForm.get('codigoCargo')?.value,
      nombreCargo: this.puntoForm.get('nombreCargo')?.value,
      dedicacionCargo: this.puntoForm.get('dedicacionCargo')?.value,
      cantidad_puntos: this.puntoForm.get('cantidad_puntos')?.value,
      origenes: [],
      cant_ocupado: 0,
    };

    this.punto_nuevo.origenes = this.puntosOrigenElegido;
  }

  onSave(): void {
    this.addPuntosOrigenes();

    this.reducirCantidadPuntosDB();

    console.log('PUNTOS NUEVO ' + JSON.stringify(this.punto_nuevo));

    this.puntoService.savePunto(this.punto_nuevo).subscribe({
      next: (resp) => {
        console.log('Registro guardado con exito ' + resp);
      },
      error: (err) => {
        console.log('Error al intentar guardar el registro');
      },
    });
  }
}
