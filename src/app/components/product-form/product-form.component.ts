import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { Category } from 'src/app/models/category';
import { Supplier } from 'src/app/models/supplier';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  public productForm: FormGroup;
  selectedFiles: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;


  private categoryService = inject(CategoryService);
  private supplierService = inject(SupplierService);
  private productService = inject(ProductService);


  constructor(
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private formBuilder: FormBuilder
  ) {

    this.productForm = this.formBuilder.group({
      nombre: [''],
      descripcion: [''],
      precio: [''],
      categoriaId: [0],
      proveedorId: [0]
    });
  }

  public categories: Category[] = [];
  public suppliers: Supplier[] = [];





  ngOnInit(): void {
    this.getCategories();
    this.getSuppliers();
  }

  public getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    })
  }

  public getSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
      }
    })
  }

  formatDate(date: Date) {
    return new Date(date).toISOString().split('T')[0]
  }


  onSubmit() {
    console.log(this.productForm.value);
    this.addProduct();
  }


  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }


  addProduct(): void {
    this.productService.addProduct(this.productForm.value, this.selectedFiles).subscribe({
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
