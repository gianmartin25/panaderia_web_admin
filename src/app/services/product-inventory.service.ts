import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductInventory } from '../models/product-inventory';
import { RegisterProductInventory } from '../models/register-product-inventory';

@Injectable({
  providedIn: 'root'
})
export class ProductInventoryService {
  private apiUrl = 'http://localhost:8080/api/inventario';
  public http = inject(HttpClient)
  private productsInventorySubject: BehaviorSubject<ProductInventory[]> = new BehaviorSubject<ProductInventory[]>([]);
  public productsInventory$: Observable<ProductInventory[]> = this.productsInventorySubject.asObservable();

  constructor() { }


  

  public getProductInventories(): Observable<ProductInventory[]> {
    return this.http.get<ProductInventory[]>(this.apiUrl)
      .pipe(
        tap(
          productInventory => {
            this.productsInventorySubject.next(productInventory) // Actualizar el caché de Employees
          }
        )
      )
  }

  addProductInventory(productInventory: RegisterProductInventory): Observable<ProductInventory> {
    return this.http.post<ProductInventory>(`${this.apiUrl}/agregar`, productInventory).pipe(
      tap(newProductInventory => {
        // Agregar el nuevo Employee al caché
        this.productsInventorySubject.next([...this.productsInventorySubject.getValue(), newProductInventory]);
      })
    );
  }

}
