import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductInventoryFormComponent } from 'src/app/components/product-inventory-form/product-inventory-form.component';
import { ProductInventoryTableComponent } from 'src/app/components/product-inventory-table/product-inventory-table.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-product-inventory',
  standalone: true,
  imports: [
    MaterialModule,
    ProductInventoryTableComponent,
],
  templateUrl: './product-inventory.component.html',
  styleUrl: './product-inventory.component.scss'
})
export class ProductInventoryComponent {
  readonly dialog = inject(MatDialog);


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ProductInventoryFormComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
