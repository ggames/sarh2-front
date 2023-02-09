import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'puntos',
    loadChildren: () =>
      import('./puntos/puntos.module').then((m) => m.PuntosModule),
  },

  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },

  {
    path: 'agentes',
    loadChildren: () =>
      import('./agentes/agentes.module').then((m) => m.AgentesModule),
  },
  {
    path: 'transformaciones',
    loadChildren: () =>
      import('./transformaciones/transformaciones.module').then(
        (m) => m.TransformacionesModule
      ),
  },

  {
    path: 'unidades',
    loadChildren: () =>
      import('./unidades-organizativas/unidades-organizativas.module').then(
        (m) => m.UnidadesOrganizativasModule
      ),
  },

  {
    path: 'planta',
    loadChildren: () =>
      import('./planta/planta.module').then((m) => m.PlantaModule),
  },

  {
    path: 'cargo',
    loadChildren: () =>
      import('./cargos/cargos.module').then((m) => m.CargosModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
