import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Employee } from '../models/employee.model';
import { RegisterEmployee } from '../models/register-employee';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080/api/empleado';
  public http = inject(HttpClient)
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  public employees$: Observable<Employee[]> = this.employeesSubject.asObservable();



  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        tap(
          employees => {
            this.employeesSubject.next(employees) // Actualizar el caché de Employees
          }
        )
      )
  }

  addEmployee(employee: RegisterEmployee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/registrar`, employee).pipe(
      tap(newEmployee => {
        // Agregar el nuevo Employee al caché
        this.employeesSubject.next([...this.employeesSubject.getValue(), newEmployee]);
      })
    );
  }



  // removeEmployee(employeeId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${employeeId}`).pipe(
  //     tap(() => {
  //       const currentEmployees = this.employeesSubject.value.filter(emp => emp.id !== employeeId);
  //       this.employeesSubject.next(currentEmployees);
  //     })
  //   );
  // }

}


