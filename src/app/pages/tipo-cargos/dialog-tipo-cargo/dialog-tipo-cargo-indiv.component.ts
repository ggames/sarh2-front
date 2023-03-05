import { TipoCargosService } from './../../../services/tipo-cargos.service';
import { TipoCargo } from './../../../models/tipo-cargo';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-tipo-cargo-indiv',
  templateUrl: './dialog-tipo-cargo-indiv.component.html',
  styleUrls: ['./dialog-tipo-cargo-indiv.component.css'],
})
export class DialogTipoCargoIndivComponent implements OnInit {
  tipoCargoForm!: FormGroup;

  constructor(
    private tipoCargosService: TipoCargosService,
    public dialogRef: MatDialogRef<DialogTipoCargoIndivComponent>,
    @Inject(MAT_DIALOG_DATA) public tipo_cargo: TipoCargo,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.tipoCargoForm = this.fb.group({
      id: this.tipo_cargo.id,
      cargo: this.tipo_cargo.cargo,
      basico: this.tipo_cargo.basico,
      cantidad_puntos: this.tipo_cargo.cantidad_puntos,
    });
  }

  editarTipoCargo() {
    this.tipoCargoForm = this.fb.group({
      id: this.tipo_cargo.id,
      cargo: this.tipo_cargo.cargo,
      basico: this.tipoCargoForm.get('basico')?.value,
      cantidad_puntos: this.tipoCargoForm.get('cantidad_puntos')?.value,
    });

    this.tipoCargosService.updateTipoCargo(this.tipoCargoForm.value).subscribe({
      next: (res) => {
        console.log('El tipo de cargo se ha actualizado');
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
