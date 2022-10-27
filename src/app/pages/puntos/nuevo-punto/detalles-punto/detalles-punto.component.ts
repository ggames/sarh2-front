import { MatTableDataSource } from '@angular/material/table';
import { PuntoOrigen } from 'src/app/models/punto-origen';
import { Observable, Subscription } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-detalles-punto',
  templateUrl: './detalles-punto.component.html',
  styleUrls: ['./detalles-punto.component.css'],
})
export class DetallesPuntoComponent implements OnInit, OnDestroy {
  @Input() detalles!: Observable<PuntoOrigen[]>;

  @Output() evtBorrar!: EventEmitter<PuntoOrigen>;

  @Output() onSelect!: EventEmitter<PuntoOrigen>;

  displayedColumns = [
    'cargo',
    'cantidad Puntos',
    'Puntos disponibles',
    'acciones',
  ];

  dataSource!: MatTableDataSource<PuntoOrigen>;
  subscripciones: Subscription[] = [];

  constructor() {
    this.detalles = new Observable();
    this.evtBorrar = new EventEmitter();
    this.onSelect = new EventEmitter();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach((i) => {
      i.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<PuntoOrigen>();
    this.subscripciones.push(
      this.detalles.subscribe((data) => {
        this.dataSource.data = data;
      })
    );
  }

  onBorrar(item: PuntoOrigen) {
    this.evtBorrar.emit(item);
  }

  edit(item: PuntoOrigen) {
    this.onSelect.emit(item);
  }
}
