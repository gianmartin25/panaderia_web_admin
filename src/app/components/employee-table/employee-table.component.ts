import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { Employee } from 'src/app/models/employee.model';
import { EmpleadoService } from 'src/app/services/employees/employee.service';

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
})
export class EmployeeTableComponent implements OnInit {
  private employeeService = inject(EmpleadoService);
  private cdr = inject(ChangeDetectorRef);
  public employeeList: Employee[] = [];
  displayedColumns1: string[] = [
    'select',
    'nombre_completo',
    'email',
    'fecha_nacimiento',
    'fecha_contracion',
    'cargo',
    'n_documento',
    'tipo_documento',
    'budget',
  ];
  dataSource1 = new MatTableDataSource<Employee>([]);
  selection = new SelectionModel<Employee>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private filterValue: string = '';
  private startDate: string = '';
  private endDate: string = '';

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employeeList = employees;
        this.dataSource1.data = employees;
        this.cdr.detectChanges();
        this.dataSource1.paginator = this.paginator;
      },
    });

    this.employeeService.employees$.subscribe({
      next: (employees) => {
        this.employeeList = employees;
        this.dataSource1.data = employees;
        this.cdr.detectChanges();
        this.dataSource1.paginator = this.paginator;
      },
    });

    this.dataSource1.filterPredicate = (data: Employee, filter: string) => {
      let parsed: { search: string; start: string; end: string };
      try {
        parsed = JSON.parse(filter);
      } catch {
        parsed = { search: '', start: '', end: '' };
      }
      const search = parsed.search?.trim().toLowerCase() || '';
      const nombreCompleto = (
        data.nombres +
        ' ' +
        data.apellidos
      ).toLowerCase();
      const cargo = (data.cargoEmpleado || '').toLowerCase();
      const matchesText =
        nombreCompleto.includes(search) || cargo.includes(search);

      // Normalizar fechas a yyyy-MM-dd para comparar solo fecha
      const toDateString = (d: any) => {
        if (!d) return '';
        if (typeof d === 'string') {
          // Si es formato tipo 1/1/2020, conviértelo a yyyy-MM-dd
          const parts = d.split('/');
          if (parts.length === 3) {
            // asume formato MM/DD/YYYY o DD/MM/YYYY, intenta ambas
            const [a, b, c] = parts.map(Number);
            // Si el año es el último, asume DD/MM/YYYY
            if (c > 31) {
              // DD/MM/YYYY
              const month = b.toString().padStart(2, '0');
              const day = a.toString().padStart(2, '0');
              return `${c}-${month}-${day}`;
            } else {
              // MM/DD/YYYY
              const month = a.toString().padStart(2, '0');
              const day = b.toString().padStart(2, '0');
              return `${c}-${month}-${day}`;
            }
          }
          // Si ya es yyyy-MM-dd o similar, solo toma los primeros 10 caracteres
          return d.length >= 10 ? d.slice(0, 10) : d;
        }
        if (d instanceof Date) {
          return d.toISOString().slice(0, 10);
        }
        return '';
      };

      const empDateStr = toDateString(data.fechaContratacion);

      let matchesDate = true;
      if (parsed.start) {
        const startStr = toDateString(parsed.start);
        matchesDate = matchesDate && empDateStr >= startStr;
      }
      if (parsed.end) {
        const endStr = toDateString(parsed.end);
        matchesDate = matchesDate && empDateStr <= endStr;
      }
      return matchesText && matchesDate;
    };
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  applyFilter(filterValue: string, startDate?: string, endDate?: string) {
    this.filterValue = filterValue || '';
    this.startDate = startDate || '';
    this.endDate = endDate || '';
    this.dataSource1.filter = JSON.stringify({
      search: this.filterValue,
      start: this.startDate,
      end: this.endDate,
    });
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  onDateChange(
    filterValue: string,
    startDate?: string | Date,
    endDate?: string | Date
  ) {
    const toDateString = (d: any) => {
      if (!d) return '';
      if (typeof d === 'string') return d.length > 10 ? d.slice(0, 10) : d;
      // Date object
      return d.toISOString().slice(0, 10);
    };
    this.applyFilter(
      filterValue,
      toDateString(startDate),
      toDateString(endDate)
    );
  }
}
