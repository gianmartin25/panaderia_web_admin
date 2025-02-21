import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { RegisterEmployee } from '../../models/register-employee';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService extends BaseHttpService {
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<
    Employee[]
  >([]);
  public employees$: Observable<Employee[]> =
    this.employeesSubject.asObservable();

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/empleados`).pipe(
      tap((employees) => {
        this.employeesSubject.next(employees);
      })
    );
  }

  addEmployee(employee: RegisterEmployee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/empleados/registrar`, employee).pipe(
      tap((newEmployee) => {
        this.employeesSubject.next([
          ...this.employeesSubject.getValue(),
          newEmployee,
        ]);
      })
    );
  }
}
