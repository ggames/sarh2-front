import { MatDialog } from '@angular/material/dialog';
import { SubUnidadOrganizativa } from './../../../models/subunidad-organizativa';
import { SubunidadOrganizativaService } from './../../../services/subunidad-organizativa.service';
import { UnidadOrganizativaService } from './../../../services/unidad-organizativa.service';
import { Component, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { DialogSubunidadComponent } from '../dialog-subunidad/dialog-subunidad.component';

@Component({
  selector: 'app-subunidad-organizativa',
  templateUrl: './subunidad-organizativa.component.html',
  styleUrls: ['./subunidad-organizativa.component.css'],
})
export class SubunidadOrganizativaComponent implements OnInit {
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  readonly width: string = '600px';

  pageSize = 5;
  page: number = 0;

  filtro_valor = '';

  totalRegistro = 0;

  subunidades: SubUnidadOrganizativa[] = [];

  constructor(
    private unidadService: UnidadOrganizativaService,
    private subunidadService: SubunidadOrganizativaService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarSubunidades();
  }

  onSearch(search: string) {
    this.page = 0;
    this.filtro_valor = search;
  }
  prevPage() {
    if (this.page > 0) this.page -= this.pageSize;
  }

  nextPage() {
    if (this.page < this.totalRegistro - this.pageSize)
      this.page += this.pageSize;
  }

  cargarSubunidades(): void {
    this.subunidadService.obtenerSubunidades().subscribe({
      next: (res) => {
        this.subunidades = res;
        this.totalRegistro = this.subunidades.length;
      },
      error: (err) => {
        console.log('No hay registros de Subunidades');
      },
    });
  }

  openDialog() {
    const dialogRef = this.matDialog.open(DialogSubunidadComponent, {
      width: this.width,
    });

    dialogRef.afterClosed().subscribe(() => this.cargarSubunidades());
  }

  editDialog(subunidad: SubUnidadOrganizativa) {
    const dialogRef = this.matDialog.open(DialogSubunidadComponent, {
      width: this.width,
      data: subunidad,
    });
    dialogRef.afterClosed().subscribe(() => this.cargarSubunidades());
  }
}
