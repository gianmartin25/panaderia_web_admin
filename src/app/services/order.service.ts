import { Injectable } from '@angular/core';
import { ProductOrder } from '../models/order/order-product.model';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseHttpService {
  getOrders() {
    return this.http.get<ProductOrder[]>(`${this.apiUrl}/ordenes`);
  }

  getOrderStates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ordenes/estados`);
  }

  updateOrderStatus(orderId: number, newStatusId: number): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/ordenes/${orderId}/estado/${newStatusId}`,
      null // Envía null en lugar de {}
    );
  }
}
