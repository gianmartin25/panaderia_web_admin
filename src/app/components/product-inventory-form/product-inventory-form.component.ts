import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { Product } from 'src/app/models/product';
import { ProductInventoryService } from 'src/app/services/product-inventory.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-inventory-form',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-inventory-form.component.html',
  styleUrl: './product-inventory-form.component.scss'
})
export class ProductInventoryFormComponent implements OnInit, OnDestroy {

  myControl = new FormControl();
  public productInventoryForm: FormGroup;
  filteredOptions!: Observable<Product[]>;
  selectedProduct!: Product;


  private productInventoryService = inject(ProductInventoryService);
  private productService = inject(ProductService);


  constructor(
    private dialogRef: MatDialogRef<ProductInventoryFormComponent>,
    private formBuilder: FormBuilder
  ) {
    this.productInventoryForm = this.formBuilder.group({
      cantidad: ['']
    });
  }




  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.productService.filterProductsCombo(value.nombre || ''))
    );
    this.myControl.valueChanges.subscribe((product: Product) => {
      if (product && product.id) {  // Asegurarse de que es un objeto Product válido
        this.selectedProduct = product;
        console.log('Producto seleccionado:', this.selectedProduct);
      }
    });
  }

  ngOnDestroy() {
    this.dialogRef.close();
  }



  public displayFn(product: Product): string {
    return product && product.nombre ? product.nombre : '';
  }

  formatDate(date: Date) {
    return new Date(date).toISOString().split('T')[0]
  }


  onSubmit() {
    console.log({});
    this.addProductInventory();
  }



  addProductInventory(): void {
    this.productInventoryService.addProductInventory({
      cantidad: this.productInventoryForm.value.cantidad,
      productoId: this.selectedProduct.id,
    }).subscribe({
      next: (product) => {
        console.log('Product added:', product);
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error adding employee:', err);
      }
    });
  }
}
