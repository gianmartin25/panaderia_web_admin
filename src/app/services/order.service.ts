import { Injectable } from '@angular/core';
import { ProductOrder } from '../models/order/order-product.model';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseHttpService {

  getOrders() {
    return this.http.get<ProductOrder[]>(
      `${this.apiUrl}/ordenes`,
    );
  }

}
