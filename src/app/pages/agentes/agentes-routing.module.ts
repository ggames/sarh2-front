//import { PruebaComponent } from './prueba/prueba.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenteComponent } from './agente/agente.component';

const routes: Routes = [
  {
    path: '',
    component: AgenteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentesRoutingModule {}
