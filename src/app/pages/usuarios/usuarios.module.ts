import { FilterPipe } from './../../directivas/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from '../search/search.component';

@NgModule({
  declarations: [
    NuevoUsuarioComponent,
    ListaUsuarioComponent,
    //SearchComponent,
    //FilterPipe,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    SearchComponent,
    FilterPipe,
  ],
})
export class UsuariosModule {}
