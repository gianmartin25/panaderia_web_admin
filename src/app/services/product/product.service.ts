import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { RegisterProduct } from '../../models/register-producto';
import { Product } from '../../models/product';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseHttpService {
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/productos`).pipe(
      tap((products) => {
        this.productsSubject.next(products); // Actualizar el caché de Employees
      })
    );
  }

  public filterProducts(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/productos/filtrar?nombre=${name}`
    );
  }

  addProduct(product: RegisterProduct, image: FileList): Observable<Product> {
    const formData: FormData = new FormData();
    formData.append(
      'producto',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    formData.append('imagen', image[0]);
    return this.http.post<Product>(`${this.apiUrl}/productos`, formData).pipe(
      tap((newProduct) => {
        // Agregar el nuevo Employee al caché
        console.log(newProduct);
        this.productsSubject.next([
          ...this.productsSubject.getValue(),
          newProduct,
        ]);
      })
    );
  }
}
