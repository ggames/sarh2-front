import { NotificationService } from './../../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { Agente } from './../../../models/agente';
import { Component, OnInit } from '@angular/core';
import { faAnglesUp, faAnglesDown } from '@fortawesome/free-solid-svg-icons';

import { ToastrService } from 'ngx-toastr';

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

  notificationJubilaciones: Agente[] = [];

  public page: number = 0;
  pageSize = 5;
  i: number = 1;

  readonly width: string = '600px';
  readonly height: string = '800px';

  filtro_valor = '';

  totalRegistro: number = 0;

  totalNotification: number = 0;

  constructor(
    private agenteService: AgenteService,
    private notificationService: NotificationService,
    private toastrSrv: ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAgentes();
    this.getNotification();
  }

  /*   handleSearch(value: any) {
    this.filtro_valor = value;
  }

 */ getAgentes() {
    this.agenteService.getAllAgentes().subscribe({
      next: (res) => {
        this.agentes = res;
        this.totalRegistro = this.agentes.length;
      },
      error: (err) => {
        console.log('Error en la carga ...');
      },
    });
  }

  sendNotification() {
    this.notificationService.sendNotification().subscribe({
      next: (res) => {
        this.toastrSrv.success(
          `Se ha enviado ${this.totalNotification} notificaciones de jubilaciones`,
          'Fich App'
        );
      },
    });
  }

  getNotification() {
    this.notificationService.getAgenteJubilacion().subscribe({
      next: (res) => {
        this.notificationJubilaciones = res;
        this.totalNotification = this.notificationJubilaciones.length;
      },
    });
  }

  nextPage() {
    if (this.page < this.totalRegistro - this.pageSize)
      this.page += this.pageSize;
  }

  prevPage() {
    if (this.page > 0) this.page -= this.pageSize;
  }

  onSearch(search: string) {
    this.page = 0;
    this.filtro_valor = search;
  }

  openEdit(agente: Agente) {
    const dialogRef = this.matDialog.open(DialogAgenteComponent, {
      width: this.width,
      //height: this.height,
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
