import { FilterPipe } from './../../directivas/filter.pipe';
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
import { DialogPuntosComponent } from './dialog/dialogPuntos.component';
import { SortPipe } from 'src/app/directivas/sort.pipe';

@NgModule({
  declarations: [
    NuevoPuntoComponent,
    EditarPuntoComponent,
    ListaPuntosComponent,
    DialogPuntosComponent,
    SortPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PuntosRoutingModule,
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
    FilterPipe,
  ],
  providers: [SortPipe],
})
export class PuntosModule {}
