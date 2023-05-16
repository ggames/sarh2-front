import { FilterPipe } from './../../directivas/filter.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { TransformacionesRoutingModule } from './transformaciones-routing.module';
import { TransformacionComponent } from './transformacion/transformacion.component';
import { DialogTransformacionComponent } from './dialog-transformacion/dialog-transformacion.component';

@NgModule({
  declarations: [TransformacionComponent, DialogTransformacionComponent],
  imports: [
    CommonModule,
    TransformacionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FontAwesomeModule,
    CdkAccordionModule,
    MatPaginatorModule,
    MatCardModule,
    NgxMaskModule.forRoot(),
    FilterPipe,
  ],
  providers: [],
  entryComponents: [MatDialogModule],
})
export class TransformacionesModule {}
