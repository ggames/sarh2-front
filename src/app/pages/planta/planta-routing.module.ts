import { PlantaEditarComponent } from './planta-editar/planta-editar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantaListaComponent } from './planta-lista/planta-lista.component';
import { PlantaNuevaComponent } from './planta-nueva/planta-nueva.component';

const routes: Routes = [
  {
    path: '',
    component: PlantaListaComponent,
  },
  {
    path: 'create',
    component: PlantaNuevaComponent,
  },

  {
    path: 'edit/:id',
    component: PlantaEditarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantaRoutingModule {}
