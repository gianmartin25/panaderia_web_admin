import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
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
  private toastr: ToastrService = inject(ToastrService);

  constructor(
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fechaCreacion: [this.formatDate(new Date()), Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      categoriaId: [0, Validators.required],
      proveedorId: [0, Validators.required],
      maxStock: ['', Validators.required], // nuevo campo
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
      },
    });
  }

  public getSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
      },
    });
  }

  formatDate(date: Date) {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit() {
    console.log(this.productForm.value);
    if (!this.validateForm()) {
      return;
    }
    this.addProduct();
  }

  validateForm(): boolean {
    if (this.productForm.invalid) {
      this.toastr.error(
        'Por favor, complete todos los campos requeridos.',
        'Formulario inválido',
        {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        }
      );
      return false;
    }
    if (!this.selectedFiles) {
      this.toastr.error(
        'Por favor, seleccione al menos un imagen.',
        'Archivo no seleccionado',
        {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        }
      );
      return false;
    }
    const precio = this.productForm.get('precio')?.value;
    if (
      precio === null ||
      precio === undefined ||
      isNaN(precio) ||
      Number(precio) <= 0
    ) {
      this.toastr.error('El precio debe ser mayor a cero.', 'Precio inválido', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return false;
    }
    const limiteCompra = this.productForm.get('maxStock')?.value;
    if (
      limiteCompra === null ||
      limiteCompra === undefined ||
      isNaN(limiteCompra) ||
      Number(limiteCompra) <= 0
    ) {
      this.toastr.error('El límite de compra debe ser mayor a cero.', 'Límite inválido', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return false;
    }
    return true;
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
    this.productService
      .addProduct(this.productForm.value, this.selectedFiles)
      .subscribe({
        next: (product) => {
          console.log('Product added:', product);
          this.dialogRef.close();
          this.toastr.success(
            'Producto agregado correctamente',
            'Registro exitoso',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
        },
        error: (err) => {
          console.error('Error adding employee:', err);
          this.toastr.error(err.error.error, 'Registro fallido', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        },
      });
  }
}
