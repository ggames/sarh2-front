import { DialogTransformacionComponent } from './../dialog-transformacion/dialog-transformacion.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TransformacionesService } from './../../../services/transformaciones.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Transformacion } from 'src/app/models/transformacion';

@Component({
  selector: 'app-transformacion',
  templateUrl: './transformacion.component.html',
  styleUrls: ['./transformacion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapse', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapse',
        animate('225ms cubic-bezier(0.4, 0.8, 0.2, 1)')
      ),
    ]),
  ],
})
export class TransformacionComponent implements OnInit {
  faAnglesDown = faAngleDown;
  faAnglesUp = faAngleUp;

  pageSize = 5;
  i = 1;
  desde: number = 0;
  hasta: number = 5;

  transformaciones: Transformacion[] = [];

  readonly width: string = '600px';

  constructor(
    private transformacionService: TransformacionesService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTransformaciones();
  }

  getTransformaciones() {
    this.transformacionService.getTransformaciones().subscribe({
      next: (resp) => {
        this.transformaciones = resp;
      },
      error: (err) => {
        console.log('Error de carga');
      },
    });
  }

  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex + this.pageSize;
    this.hasta = this.desde + this.pageSize;
  }

  openEdit(transformacion: Transformacion) {
    const dialogRef = this.matDialog.open(DialogTransformacionComponent, {
      width: this.width,
      data: transformacion,
    });

    dialogRef.afterClosed().subscribe((res) => this.getTransformaciones());
  }

  openAdd() {
    const dialogRef = this.matDialog.open(DialogTransformacionComponent, {
      width: this.width,
    });

    dialogRef.afterClosed().subscribe((res) => this.getTransformaciones());
  }
}
