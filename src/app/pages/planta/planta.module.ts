import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DateInputConverter } from './../../utils/date-input-converter.directive';
import { PlantaNuevaComponent } from './planta-nueva/planta-nueva.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantaRoutingModule } from './planta-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { PlantaListaComponent } from './planta-lista/planta-lista.component';
import { PlantaEditarComponent } from './planta-editar/planta-editar.component';

@NgModule({
  declarations: [
    PlantaNuevaComponent,
    DateInputConverter,
    PlantaListaComponent,
    PlantaEditarComponent,
  ],
  imports: [
    CommonModule,
    PlantaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    CdkAccordionModule,
  ],
})
export class PlantaModule {}
