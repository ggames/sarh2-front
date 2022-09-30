import { UnidadOrganizativaComponent } from './unidad-organizativa/unidad-organizativa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UnidadOrganizativaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadesOrganizativasRoutingModule {}
