import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeTableComponent } from 'src/app/components/employee-table/employee-table.component';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { MaterialModule } from 'src/app/material.module';
import { ProductTableComponent } from "../../../components/product-table/product-table.component";

@Component({
  selector: 'admin-products',
  standalone: true,
  imports: [
    EmployeeTableComponent,
    MaterialModule,
    ProductTableComponent
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  readonly dialog = inject(MatDialog)


  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.dialog.open(ProductFormComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
