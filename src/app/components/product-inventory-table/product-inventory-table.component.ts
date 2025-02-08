import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { ProductInventory } from 'src/app/models/product-inventory';
import { ProductInventoryService } from 'src/app/services/product-inventory.service';

@Component({
  selector: 'app-product-inventory-table',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule
  ],
  templateUrl: './product-inventory-table.component.html',
  styleUrl: './product-inventory-table.component.scss'
})
export class ProductInventoryTableComponent {
  displayedColumns1: string[] = ['select', 'nombre', 'cantidad', 'fechaIngreso', 'budget'];
  private productInventoryService = inject(ProductInventoryService);
  private cdr = inject(ChangeDetectorRef)
  public productList: ProductInventory[] = [];
  dataSource1 = new MatTableDataSource<ProductInventory>([]);
  selection = new SelectionModel<ProductInventory>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;




  ngOnInit(): void {
    this.productInventoryService.getProductInventories().subscribe({
      next: (productsInventory) => {
        this.dataSource1 = new MatTableDataSource<ProductInventory>(productsInventory);
        this.productList = productsInventory;
        this.cdr.detectChanges()
        this.dataSource1.paginator = this.paginator
      }
    });

    this.productInventoryService.productsInventory$.subscribe({
      next: (productsInventory) => {
        this.dataSource1 = new MatTableDataSource<ProductInventory>(productsInventory);
        this.productList = productsInventory;
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
    const numRows = this.productList.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.productList);
  }

  checkboxLabel(row?: ProductInventory): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
