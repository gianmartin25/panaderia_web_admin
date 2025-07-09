import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material.module';
import { ProductOrder } from 'src/app/models/order/order-product.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-sales-update-status',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './sales-update-status.component.html',
  // styleUrls: ['./sales-update-status.component.scss']
})
export class SalesUpdateStatusComponent implements OnInit {
  statusForm: FormGroup;
  private orderService = inject(OrderService);
  private toastr = inject(ToastrService);

  estados: { id: number; nombre: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SalesUpdateStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductOrder
  ) {
    this.statusForm = this.fb.group({
      estado: [data.estado, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStates();
  }

  loadStates(): void {
    this.orderService.getOrderStates().subscribe({
      next: (states) => {
        this.estados = states;
      },
      error: (error) => {
        console.error('Error al cargar estados:', error);
        this.toastr.error('Error al cargar los estados', 'Error');
      },
    });
  }

  onSubmit(): void {
    if (this.statusForm.valid) {
      const newStatusId = Number(this.statusForm.value.estado);

      this.orderService.updateOrderStatus(this.data.id, newStatusId).subscribe({
        next: (response) => {
          this.toastr.success(
            'Estado de venta actualizado correctamente',
            'Actualización exitosa',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.toastr.error(
            'No se pudo actualizar el estado de la venta',
            'Error en la actualización',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          console.error('Error al actualizar estado:', error);
        },
      });
    } else {
      this.toastr.warning(
        'Por favor seleccione un estado válido',
        'Formulario inválido',
        {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
