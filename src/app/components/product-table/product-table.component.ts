import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

// table 1
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}


@Component({
  selector: 'product-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {
  displayedColumns1: string[] = ['select', 'assigned', 'price', 'totalCantidad', 'category', 'supplier', 'budget'];
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef)
  public productList: Product[] = [];
  dataSource1 = new MatTableDataSource<Product>([]);
  selection = new SelectionModel<Product>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;




  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {

        this.dataSource1 = new MatTableDataSource<Product>(products);
        this.productList = products;
        this.cdr.detectChanges()
        this.dataSource1.paginator = this.paginator
      }
    });

    this.productService.products$.subscribe({
      next: (products) => {
        this.dataSource1 = new MatTableDataSource<Product>(products);
        this.productList = products;
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

  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
