import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubunidadOrganizativaRoutingModule } from './subunidad-organizativa-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubunidadOrganizativaComponent } from './subunidad-organizativa/subunidad-organizativa.component';
import { DialogSubunidadComponent } from './dialog-subunidad/dialog-subunidad.component';

@NgModule({
  declarations: [SubunidadOrganizativaComponent, DialogSubunidadComponent],
  imports: [
    CommonModule,
    SubunidadOrganizativaRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    CdkAccordionModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatCardModule,
    MatPaginatorModule,
  ],
})
export class SubunidadOrganizativaModule {}
