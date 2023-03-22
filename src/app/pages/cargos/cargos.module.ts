import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogCargoComponent } from './dialog-cargo/dialog-cargo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosRoutingModule } from './cargos-routing.module';
import { ListaCargoComponent } from './lista-cargo/lista-cargo.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [DialogCargoComponent, ListaCargoComponent],
  imports: [
    CommonModule,
    CargosRoutingModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    CdkAccordionModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    MatDialogModule,
  ],
  providers: [],
  entryComponents: [MatDialogModule],
})
export class CargosModule {}
