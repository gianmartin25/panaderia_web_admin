import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { ICustomer } from 'src/app/models/customers/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseHttpService {
  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(`${this.apiUrl}/usuarios/clientes`);
  }
}
