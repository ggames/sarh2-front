import { ListaPuntosComponent } from './lista-puntos/lista-puntos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoPuntoComponent } from './nuevo-punto/nuevo-punto.component';

const routes: Routes = [
  {
    path: '',
    component: ListaPuntosComponent,
  },
  {
    path: 'create',
    component: NuevoPuntoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntosRoutingModule {}
