import { FilterPipe } from './../../directivas/filter.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesOrganizativasRoutingModule } from './unidades-organizativas-routing.module';
import { UnidadOrganizativaComponent } from './unidad-organizativa/unidad-organizativa.component';
import { DialogUnidadComponent } from './dialog-unidad/dialog-unidad.component';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [UnidadOrganizativaComponent, DialogUnidadComponent],
  imports: [
    CommonModule,
    UnidadesOrganizativasRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatCardModule,
    CdkAccordionModule,
    FontAwesomeModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(),
    FilterPipe,
  ],
})
export class UnidadesOrganizativasModule {}
