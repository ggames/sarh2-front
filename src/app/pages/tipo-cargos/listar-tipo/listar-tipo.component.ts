import { DialogTipoCargoComponent } from './../dialog/dialog-tipo-cargo.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TipoCargo } from './../../../models/tipo-cargo';
import { TipoCargosService } from './../../../services/tipo-cargos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-tipo',
  templateUrl: './listar-tipo.component.html',
  styleUrls: ['./listar-tipo.component.css'],
})
export class ListarTipoComponent implements OnInit {
  // ****  VARIABLES DE PAGINACION ****************** ////
  pageSize = 10;
  i: number = 1;
  desde: number = 0;
  hasta: number = 10;

  readonly width: string = '600px';

  tiposCargos: TipoCargo[] = [];

  constructor(
    private tipoCargoService: TipoCargosService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerAllTipoCargos();
  }

  obtenerAllTipoCargos(): void {
    this.tipoCargoService.getTiposCargos().subscribe({
      next: (res) => {
        this.tiposCargos = res;
      },
    });
  }

  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  openDialog() {
    const dialogRef = this.matDialog.open(DialogTipoCargoComponent, {
      width: this.width,
    });

    dialogRef.afterClosed().subscribe(() => this.obtenerAllTipoCargos());
  }
}
