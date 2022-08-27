import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { NuevoUsuario } from './../../../models/nuevo-usuario';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
})
export class NuevoUsuarioComponent implements OnInit {
  isRegister = false;
  isRegisterfail = false;
  nuevoUsuario: NuevoUsuario | undefined;
  nombre!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  roles: Rol[] = [];
  rol!: string;
  errMsj!: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private rolService: RolService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }

    this.rolService.getRoles().subscribe({
      next: (res) => (this.roles = res),
    });
  }

  onRegister() {
    this.nuevoUsuario = new NuevoUsuario(
      this.nombre,
      this.nombreUsuario,
      this.email,
      this.password,
      [this.rol]
    );

    console.error(
      'VALOR DE NUEVO USUARIO ' + JSON.stringify(this.nuevoUsuario)
    );

    this.authService.nuevo(this.nuevoUsuario).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'El usuario' + this.nombreUsuario + ' se guardo con exito',
          showConfirmButton: false,
          timer: 1500,
        });

        // this.router.navigate(['/']);
      },
      error: (err) => {
        this.isRegister = false;
        this.isRegisterfail = true;
        this.errMsj = err.error.mensaje;

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo registrar al usuario',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    });
  }
}
