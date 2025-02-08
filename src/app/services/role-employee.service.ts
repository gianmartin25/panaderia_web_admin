import { inject, Injectable } from '@angular/core';
import { RoleEmployee } from '../models/role-employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleEmployeeService {
  private apiUrl = 'http://localhost:8080/api/cargo-empleado';
  public http = inject(HttpClient)


  public getRolesEmployee(): Observable<RoleEmployee[]> {
    return this.http.get<RoleEmployee[]>(`${this.apiUrl}`)
  }
}
