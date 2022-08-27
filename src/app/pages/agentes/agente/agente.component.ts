import { MatDialog } from '@angular/material/dialog';
import { Agente } from './../../../models/agente';
import { Component, OnInit } from '@angular/core';
import { faAnglesUp, faAnglesDown } from '@fortawesome/free-solid-svg-icons';

import { PageEvent } from '@angular/material/paginator';
import { AgenteService } from 'src/app/services/agente.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DialogAgenteComponent } from '../dialog-agente/dialog-agente.component';

@Component({
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css'],
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
export class AgenteComponent implements OnInit {
  faAngleUp = faAnglesUp;
  faAngleDown = faAnglesDown;

  agentes: Agente[] = [];

  pageSize = 5;
  i: number = 1;
  desde: number = 0;
  hasta: number = 5;

  constructor(
    private agenteService: AgenteService,
    private matDialog: MatDialog
  ) {}

  readonly width: string = '600px';

  ngOnInit(): void {
    this.getAgentes();
  }

  getAgentes() {
    this.agenteService.getAllAgentes().subscribe({
      next: (res) => {
        this.agentes = res;
      },
      error: (err) => {
        console.log('Error en la carga ...');
      },
    });
  }

  cambiarpagina(e: PageEvent) {
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  openEdit(agente: Agente) {
    const dialogRef = this.matDialog.open(DialogAgenteComponent, {
      width: this.width,
      data: agente,
    });

    dialogRef.afterClosed().subscribe((res) => this.getAgentes());
  }

  openAdd() {
    const dialogRef = this.matDialog.open(DialogAgenteComponent, {
      width: this.width,
    });

    dialogRef.afterClosed().subscribe((res) => this.getAgentes());
  }
}
