import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { DialogUnidadComponent } from './../dialog-unidad/dialog-unidad.component';
import { PageEvent } from '@angular/material/paginator';
import { UnidadOrganizativa } from './../../../models/unidad-organizativa';
import { MatDialog } from '@angular/material/dialog';
import { UnidadOrganizativaService } from './../../../services/unidad-organizativa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unidad-organizativa',
  templateUrl: './unidad-organizativa.component.html',
  styleUrls: ['./unidad-organizativa.component.css'],
})
export class UnidadOrganizativaComponent implements OnInit {
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  pageSize = 5;
  i = 1;

  desde: number = 0;
  hasta: number = 5;

  unidades_organizativas: UnidadOrganizativa[] = [];

  constructor(
    private unidadesService: UnidadOrganizativaService,
    private MatDialog: MatDialog
  ) {}

  readonly width: string = '600px';

  ngOnInit(): void {
    this.getUnidadesOrganizativas();
  }

  getUnidadesOrganizativas() {
    this.unidadesService.getUnidades().subscribe({
      next: (resp) => {
        this.unidades_organizativas = resp;
      },
      error: (err) => {
        console.log('Error en la carga de unidades organizativas');
      },
    });
  }

  openEdit(unidades: UnidadOrganizativa) {
    const dialogRef = this.MatDialog.open(DialogUnidadComponent, {
      width: this.width,
      data: unidades,
    });

    dialogRef.afterClosed().subscribe((resp) => {
      this.getUnidadesOrganizativas();
    });
  }

  openAdd() {
    const dialogRef = this.MatDialog.open(DialogUnidadComponent, {
      width: this.width,
    });

    dialogRef.afterClosed().subscribe((resp) => {
      this.getUnidadesOrganizativas();
    });
  }

  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex + this.pageSize;
    this.hasta = this.desde + this.pageSize;
  }
}
