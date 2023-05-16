import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  public page: number = 0;
  pageSize = 5;

  filtro_valor = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  handleSearch(value: any) {
    this.filtro_valor = value;
  }

  nextPage() {
    if (this.page < this.totalRegistrado - this.pageSize)
      this.page += this.pageSize;
  }

  prevPage() {
    if (this.page > 0) this.page -= this.pageSize;
  }

  onSearch(search: string) {
    this.page = 0;
    this.filtro_valor = search;
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
        this.totalRegistrado = this.usuarios.length;
      },
      error: (err) => {
        console.log('Error de carga ...');
      },
    });
  }
}
