import { CargoNuevoComponent } from './cargo-nuevo/cargo-nuevo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosRoutingModule } from './cargos-routing.module';

@NgModule({
  declarations: [CargoNuevoComponent],
  imports: [
    CommonModule,
    CargosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CargosModule {}
