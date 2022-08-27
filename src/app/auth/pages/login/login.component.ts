import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      (data) => {
        this.tokenService.setToken(data.token);

        Swal.fire({
          icon: 'success',
          title: 'Bienvenido ' + this.nombreUsuario,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/app']);
      },
      (err) => {
        this.errMsj = err.error.message;

        Swal.fire({
          icon: 'error',
          title: 'Fallo Login...',
          text: 'Error en el login, no autorizado',
        });

        console.log(this.errMsj);
      }
    );
  }
}
