import { SubunidadOrganizativaComponent } from './subunidad-organizativa/subunidad-organizativa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SubunidadOrganizativaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubunidadOrganizativaRoutingModule {}
