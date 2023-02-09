import { CargoNuevoComponent } from './cargo-nuevo/cargo-nuevo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create',
    component: CargoNuevoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargosRoutingModule {}
