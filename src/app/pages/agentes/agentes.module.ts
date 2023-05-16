import { FilterPipe } from './../../directivas/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { AgentesRoutingModule } from './agentes-routing.module';
import { EditarAgenteComponent } from './editar-agente/editar-agente.component';
import { AgenteComponent } from './agente/agente.component';
import { DialogAgenteComponent } from './dialog-agente/dialog-agente.component';
import { PagesModule } from '../pages.module';
import { SearchComponent } from '../search/search.component';

@NgModule({
  declarations: [
    AgenteComponent,
    EditarAgenteComponent,
    DialogAgenteComponent,
    //FilterPipe,
  ],
  //  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  entryComponents: [MatDialogModule],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    AgentesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CdkAccordionModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FontAwesomeModule,
    PagesModule,
    SearchComponent,
    FilterPipe,
  ],
})
export class AgentesModule {}
