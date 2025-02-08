import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Employee } from '../models/employee.model';
import { RegisterProduct } from '../models/register-producto';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/productos';
  public http = inject(HttpClient)
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();



  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(
        tap(
          products => {
            this.productsSubject.next(products) // Actualizar el caché de Employees
          }
        )
      )
  }

  public filterProductsCombo(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/filtrar?nombre=${name}`)
  }

  addProduct(product: RegisterProduct,image: FileList): Observable<Product> {

    const formData: FormData = new FormData();
    formData.append('producto', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    formData.append('imagen', image[0]);
    return this.http.post<Product>(`${this.apiUrl}`, formData).pipe(
      tap(newProduct => {
        // Agregar el nuevo Employee al caché
        console.log(newProduct);
        this.productsSubject.next([...this.productsSubject.getValue(), newProduct]);
      })
    );
  }

}
