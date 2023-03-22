import { MatDialog } from '@angular/material/dialog';
import { SubUnidadOrganizativa } from './../../../models/subunidad-organizativa';
import { SubunidadOrganizativaService } from './../../../services/subunidad-organizativa.service';
import { UnidadOrganizativaService } from './../../../services/unidad-organizativa.service';
import { Component, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { DialogSubunidadComponent } from '../dialog-subunidad/dialog-subunidad.component';
import { PageEvent } from '@angular/material/paginator';

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
  i = 1;
  desde: number = 0;
  hasta: number = 5;

  subunidades: SubUnidadOrganizativa[] = [];

  constructor(
    private unidadService: UnidadOrganizativaService,
    private subunidadService: SubunidadOrganizativaService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarSubunidades();
  }

  cargarSubunidades(): void {
    this.subunidadService.obtenerSubunidades().subscribe({
      next: (res) => {
        this.subunidades = res;
      },
      error: (err) => {
        console.log('No hay registros de Subunidades');
      },
    });
  }

  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex + this.pageSize;
    this.hasta = this.desde + this.pageSize;
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
