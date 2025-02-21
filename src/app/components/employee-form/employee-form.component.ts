import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { DocumentType } from 'src/app/models/document-type';
import { RoleEmployee } from 'src/app/models/role-employee';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { EmpleadoService } from 'src/app/services/employees/employee.service';
import { RoleEmployeeService } from 'src/app/services/role-employee.service';
import { DatePickerComponent } from "../date-picker/date-picker.component";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'admin-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogActions,
    MatDialogModule,
    DatePickerComponent,
  ],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  private documentTypeService = inject(DocumentTypeService);
  private employeeService = inject(EmpleadoService);
  private rolesEmployeeService = inject(RoleEmployeeService);


  constructor(
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {


    this.employeeForm = this.formBuilder.group({
      nombres: [''],
      apellidos: [''],
      documento: [''],
      tipoDocumento: [0],
      idCargoEmpleado: [0],
      fechaNacimiento: [''],
      fechaContratacion: [''],
    });
  }

  public documentTypes: DocumentType[] = [];
  public rolesEmployee: RoleEmployee[] = [];





  ngOnInit(): void {
    this.getDocumentTypes();
    this.getRolesEmployee();
  }

  public getRolesEmployee() {
    this.rolesEmployeeService.getRolesEmployee().subscribe({
      next: (rolesEmployee) => {
        this.rolesEmployee = rolesEmployee;
      }
    });
  }

  public getDocumentTypes() {
    this.documentTypeService.getDocumentTypes().subscribe({
      next: (documentTypes) => {
        this.documentTypes = documentTypes;
      }
    })
  }

  formatDate(date: Date) {
    return new Date(date).toISOString().split('T')[0]
  }


   onSubmit() {
    this.employeeForm.value.fechaNacimiento = this.formatDate(this.employeeForm.value.fechaNacimiento);
    this.employeeForm.value.fechaContratacion = this.formatDate(this.employeeForm.value.fechaContratacion);
    console.log(this.employeeForm.value);
    this.addEmployee();
  }


  addEmployee(): void {
    this.employeeService.addEmployee(this.employeeForm.value).subscribe({
      next: (employee) => {
        console.log('Employee added:', employee);
        this.dialogRef.close('Form submitted');
      },
      error: (err) => {
        console.error('Error adding employee:', err);
      }
    });
  }
}
