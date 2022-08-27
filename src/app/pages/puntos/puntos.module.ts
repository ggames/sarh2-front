import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuntosRoutingModule } from './puntos-routing.module';

import { EditarPuntoComponent } from './editar-punto/editar-punto.component';

import { DialogpuntoComponent } from './nuevo-punto/dialog/dialogpunto.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { NuevoPuntoComponent } from './nuevo-punto/nuevo-punto.component';
import { ListaPuntosComponent } from './lista-puntos/lista-puntos.component';

@NgModule({
  declarations: [
    NuevoPuntoComponent,
    EditarPuntoComponent,
    DialogpuntoComponent,
    DialogpuntoComponent,
    ListaPuntosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PuntosRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class PuntosModule {}
