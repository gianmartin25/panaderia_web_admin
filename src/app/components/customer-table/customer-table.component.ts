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
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'customer-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
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
  noResults = false;

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

    this.dataSource1.filterPredicate = (data: ICustomer, filter: string) => {
      const search = filter.trim().toLowerCase();
      const nombreCompleto = data.nombres.toLowerCase();
      const correo = (data.email || '').toLowerCase();
      return nombreCompleto.includes(search) || correo.includes(search);
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.noResults = this.dataSource1.filteredData.length === 0;
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
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
