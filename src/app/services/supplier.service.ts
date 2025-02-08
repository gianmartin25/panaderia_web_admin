import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Supplier } from '../models/supplier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:8080/api/proveedores';
  public http = inject(HttpClient)

  public getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}`)
  }
}
