import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { ProductOrder } from 'src/app/models/order/order-product.model';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { SalesUpdateStatusComponent } from 'src/app/components/sales-update-status/sales-update-status.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  private orderService: OrderService = inject(OrderService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  columnas: string[] = [
    'fechaCreacion',
    'cliente',
    'total',
    'estado',
    'pagado',
    'productos',
    'acciones',
  ];
  sales = new MatTableDataSource<ProductOrder>([]);

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        console.log(data);
        this.sales = new MatTableDataSource<ProductOrder>(data);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openUpdateStatusModal(sale: ProductOrder): void {
    const dialogRef = this.dialog.open(SalesUpdateStatusComponent, {
      width: '600px',
      data: sale,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Actualizar la lista de ventas
        this.getOrders();
        this.toastr.info('La lista de ventas ha sido actualizada', 'Datos actualizados', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
        });
      }
    });
  }
}
