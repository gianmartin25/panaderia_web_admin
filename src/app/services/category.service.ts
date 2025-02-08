import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categorias';
  public http = inject(HttpClient)

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`)
  }
}
