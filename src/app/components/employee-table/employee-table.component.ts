import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { Employee } from 'src/app/models/employee.model';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
})
export class EmployeeTableComponent implements OnInit {
  private employeeService = inject(EmpleadoService);
  private cdr = inject(ChangeDetectorRef)
  public employeeList: Employee[] = [];
  displayedColumns1: string[] = ['select', 'nombre_completo', 'fecha_nacimiento', 'fecha_contracion', 'cargo', 'n_documento', 'tipo_documento', 'budget'];
  dataSource1 = new MatTableDataSource<Employee>([]);
  selection = new SelectionModel<Employee>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;




  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {

        this.dataSource1 = new MatTableDataSource<Employee>(employees);
        this.employeeList = employees;
        this.cdr.detectChanges()
        this.dataSource1.paginator = this.paginator
      }
    });

    this.employeeService.employees$.subscribe({
      next: (employees) => {
        this.dataSource1 = new MatTableDataSource<Employee>(employees);
        this.employeeList = employees;
        this.cdr.detectChanges()
        this.dataSource1.paginator = this.paginator
      }
    })
  }

  ngAfterViewInit() {

    this.dataSource1.paginator = this.paginator; // Vinculación después de la vista cargada
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.employeeList.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.employeeList);
  }

  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
