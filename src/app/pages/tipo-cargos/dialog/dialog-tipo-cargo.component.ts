import { ToastrService } from 'ngx-toastr';
import { TipoCargosService } from './../../../services/tipo-cargos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-tipo-cargo.component.html',
  styleUrls: ['./dialog-tipo-cargo.component.css'],
})
export class DialogTipoCargoComponent implements OnInit {
  formTipoCargo!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastrSrv: ToastrService,
    private tipoCargosService: TipoCargosService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formTipoCargo = this.fb.group({
      porcentaje: [1.0, Validators.required],
      indice: [1.0, Validators.required],
    });
  }

  actualizarTipoCargo(): void {
    this.tipoCargosService
      .updateAllTipoCargo(this.formTipoCargo.value)
      .subscribe({
        next: (res) => {
          this.toastrSrv.success(
            `El tipo de cargo se actualizo correctamente ${res}`
          );
          // console.log('Se actualizo correctamente ' + res);
        },

        error: (err) => {
          this.toastrSrv.error(err.error.mensaje);
        },
      });
  }
}
