import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from 'src/app/components/employee-form/employee-form.component';
import { MaterialModule } from 'src/app/material.module';
import { Employee } from 'src/app/models/employee.model';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmployeeTableComponent } from "../../../components/employee-table/employee-table.component";

// table 1
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/dash-prd-1.jpg',
    uname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
    budget: 180,
    priority: 'confirmed',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/dash-prd-2.jpg',
    uname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    budget: 90,
    priority: 'cancelled',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/dash-prd-3.jpg',
    uname: 'PlayStation 5 DualSense Wireless Controller',
    budget: 120,
    priority: 'rejected',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/dash-prd-4.jpg',
    uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
    budget: 160,
    priority: 'confirmed',
  },
];

@Component({
  selector: 'admin-employees',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    EmployeeTableComponent
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminEmployeesComponent {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EmployeeFormComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
