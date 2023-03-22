import { DialogCargoComponent } from './../dialog-cargo/dialog-cargo.component';
import { MatDialog } from '@angular/material/dialog';
import { Cargo } from 'src/app/models/cargo';
import { CargoService } from './../../../services/cargo.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  faAnglesUp,
  faAnglesDown,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-lista-cargo',
  templateUrl: './lista-cargo.component.html',
  styleUrls: ['./lista-cargo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapse', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapse',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListaCargoComponent implements OnInit {
  faAnglesDown = faAngleDown;
  faAnglesUp = faAngleUp;

  pageSize = 5;
  i = 1;
  desde: number = 0;
  hasta: number = 5;

  cargos: Cargo[] = [];

  constructor(
    private cargoService: CargoService,
    private matDialog: MatDialog
  ) {}

  readonly width: string = '800px';

  ngOnInit(): void {
    this.obtenerCargos();
  }

  obtenerCargos(): void {
    this.cargoService.getCargos().subscribe({
      next: (res) => {
        this.cargos = res;

        console.log('CARGOS CANTIDAD ' + this.cargos.length);
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogCargoComponent, {
      width: this.width,
    });

    dialogRef.afterClosed().subscribe(() => this.obtenerCargos());
  }

  editDialog(cargo: Cargo): void {
    const dialogRef = this.matDialog.open(DialogCargoComponent, {
      width: this.width,
      data: cargo,
    });

    dialogRef.afterClosed().subscribe(() => this.obtenerCargos());
  }

  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex + this.pageSize;
    this.hasta = this.desde + this.pageSize;
  }
}
