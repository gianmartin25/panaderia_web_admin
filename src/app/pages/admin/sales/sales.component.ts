import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { ProductOrder } from 'src/app/models/order/order-product.model';
import { OrderService } from 'src/app/services/order.service';

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

  columnas: string[] = [
    'fechaCreacion',
    'cliente',
    'total',
    'estado',
    'pagado',
    'productos',
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
}
