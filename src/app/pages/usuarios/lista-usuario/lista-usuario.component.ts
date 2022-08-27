import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/app/models/usuario-dto';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css'],
})
export class ListaUsuarioComponent implements OnInit {
  usuarios: UsuarioDTO[] = [];

  cargando!: boolean;

  totalRegistrado = 0;

  isAdmin = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (err) => {
        console.log('Error de carga ...');
      },
    });
  }
}
