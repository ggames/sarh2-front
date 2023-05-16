import { DialogCargoComponent } from './../dialog-cargo/dialog-cargo.component';
import { MatDialog } from '@angular/material/dialog';
import { Cargo } from 'src/app/models/cargo';
import { CargoService } from './../../../services/cargo.service';
import { Component, OnInit } from '@angular/core';
import { faAnglesUp, faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

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
  faAnglesDown = faAnglesDown;
  faAnglesUp = faAnglesUp;

  public page: number = 0;
  pageSize = 8;

  totalRegistro: number = 0;

  filtro_valor = '';

  cargos: Cargo[] = [];

  constructor(
    private toastSrv: ToastrService,
    private cargoService: CargoService,
    private matDialog: MatDialog
  ) {}

  readonly width: string = '800px';

  ngOnInit(): void {
    this.obtenerCargos();
  }

  nextPage() {
    if (this.page < this.cargos.length - this.pageSize)
      this.page += this.pageSize;
  }

  prevPage() {
    if (this.page > 0) this.page -= this.pageSize;
  }

  onSearch(search: string) {
    this.page = 0;
    this.filtro_valor = search;
  }

  obtenerCargos(): void {
    this.cargoService.getCargos().subscribe({
      next: (res) => {
        this.cargos = res;
        this.totalRegistro = this.cargos.length;

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
    if (cargo.estadoCargo.id == 1 && cargo.puntoId.transitorio == true) {
      this.toastSrv.error('No se puede modificar el registro', 'App Fich');
    } else {
      const dialogRef = this.matDialog.open(DialogCargoComponent, {
        width: this.width,
        data: cargo,
      });

      dialogRef.afterClosed().subscribe(() => this.obtenerCargos());
    }
  }
}
