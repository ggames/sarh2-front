import { MatCardModule } from '@angular/material/card';
import { NuevoPuntoComponent } from './nuevo-punto/nuevo-punto.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuntosRoutingModule } from './puntos-routing.module';

import { EditarPuntoComponent } from './editar-punto/editar-punto.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';

import { ListaPuntosComponent } from './lista-puntos/lista-puntos.component';
import { DetallesPuntoComponent } from './nuevo-punto/detalles-punto/detalles-punto.component';

@NgModule({
  declarations: [
    NuevoPuntoComponent,
    EditarPuntoComponent,
    //    DialogpuntoComponent,
    ListaPuntosComponent,
    DetallesPuntoComponent,
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
    MatAutocompleteModule,
    MatSnackBarModule,
    MatCardModule,
    MatCheckboxModule,
  ],
})
export class PuntosModule {}
