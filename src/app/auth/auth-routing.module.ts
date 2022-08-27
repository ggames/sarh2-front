import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard as guard_user } from '../guards/auth.guard';
import { LoginGuard } from '../guards/login.guard';
import { PagesComponent } from '../pages/pages.component';
import { TokenService } from './../services/token.service';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
