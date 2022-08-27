import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario/nuevo-usuario.component';
import { ListaUsuarioComponent } from './usuarios/lista-usuario/lista-usuario.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
