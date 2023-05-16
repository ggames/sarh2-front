import { TipoCargosService } from './../../../services/tipo-cargos.service';
import { UnidadOrganizativa } from 'src/app/models/unidad-organizativa';
import { Planta } from './../../../models/planta';
import { UnidadOrganizativaService } from './../../../services/unidad-organizativa.service';
import { Busqueda } from 'src/app/models/busqueda';
import { PlantaService } from './../../../services/planta.service';
import { Component, OnInit } from '@angular/core';
import { GeneradorReporteService } from 'src/app/services/generador-reporte.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent implements OnInit {
  plantas: any[] = [];

  departamentos: any[] = [];

  tiposcargos: any[] = [];

  departamentoElegido: any = null;

  tipocargoElegido: any = null;

  busqueda: Busqueda = {
    docente: '',
    materia: '',
    departamento: '',
    tipocargo: '',
  };

  constructor(
    private plantaService: PlantaService,
    private reporteService: GeneradorReporteService,
    private departamentoService: UnidadOrganizativaService,
    private tipocargoService: TipoCargosService
  ) {}

  ngOnInit(): void {
    this.listaDepartamentos();
    this.listarTiposCargos();
    this.listaPlantas();
  }

  listarTiposCargos(): void {
    this.tipocargoService.getTiposCargos().subscribe({
      next: (data) => {
        this.tiposcargos = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  listaDepartamentos(): void {
    this.departamentoService.getUnidades().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  listaPlantas(): void {
    this.plantaService.getPlantas(this.busqueda).subscribe({
      next: (data) => {
        this.plantas = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onChangeDepartamento(): void {
    if (this.departamentoElegido) {
      this.busqueda.departamento = this.departamentoElegido.nombre;
    } else {
      this.busqueda.departamento = '';
      this.busqueda.materia = '';
    }
    this.listaPlantas();
  }

  clearDocente(): void {
    this.busqueda.docente = '';
    this.listaPlantas();
  }

  clear(): void {
    this.departamentoElegido = null;
    this.tipocargoElegido = null;
    this.busqueda.departamento = '';
    this.busqueda.docente = '';
    this.busqueda.materia = '';
    this.busqueda.tipocargo = '';
    this.listaPlantas();
  }

  onChangeTipoCargo(): void {
    if (this.tipocargoElegido) {
      this.busqueda.tipocargo = this.tipocargoElegido.cargo;
    } else {
      this.busqueda.tipocargo = '';
    }
    this.listaPlantas();
  }

  getPlantaListPdf(): void {
    this.reporteService.generatePlantaListPdf(this.busqueda).subscribe({
      next: (data) => {
        let downloadURL = window.URL.createObjectURL(data);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'plantasList.pdf';
        link.click();
      },
    });
  }

  getPlantaListExcel(): void {
    this.reporteService.generarePlantaListExcel(this.busqueda).subscribe({
      next: (data) => {
        let downloadURL = window.URL.createObjectURL(data);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'plantaList.xls';
        link.click();
      },
    });
  }
}
