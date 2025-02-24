import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { ICustomer } from 'src/app/models/customers/customer.model';
import { CustomerService } from 'src/app/services/customers/customer.service';

@Component({
  selector: 'customer-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent implements OnInit {
  private customerService = inject(CustomerService);
  private cdr = inject(ChangeDetectorRef);
  public employeeList: ICustomer[] = [];
  displayedColumns1: string[] = [
    'select',
    'nombre_completo',
    'email',
    'tipo_cliente',
    'n_documento',
    'tipo_documento',
    'budget',
  ];
  dataSource1 = new MatTableDataSource<ICustomer>([]);
  selection = new SelectionModel<ICustomer>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.dataSource1 = new MatTableDataSource<ICustomer>(customers);
        this.employeeList = customers;
        this.cdr.detectChanges();
        this.dataSource1.paginator = this.paginator;
      },
    });

    // this.customerService.employees$.subscribe({
    //   next: (employees) => {
    //     this.dataSource1 = new MatTableDataSource<Employee>(employees);
    //     this.employeeList = employees;
    //     this.cdr.detectChanges()
    //     this.dataSource1.paginator = this.paginator
    //   }
    // })
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

  checkboxLabel(row?: ICustomer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
