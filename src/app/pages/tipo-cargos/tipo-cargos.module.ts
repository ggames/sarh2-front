import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogTipoCargoComponent } from './dialog/dialog-tipo-cargo.component';
import { ListarTipoComponent } from './listar-tipo/listar-tipo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoCargosRoutingModule } from './tipo-cargos-routing.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@NgModule({
  declarations: [ListarTipoComponent, DialogTipoCargoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TipoCargosRoutingModule,
    MatPaginatorModule,
    CdkAccordionModule,
    MatCardModule,
    MatDialogModule,
  ],
})
export class TipoCargosModule {}
