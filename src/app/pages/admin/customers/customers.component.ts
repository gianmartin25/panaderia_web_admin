import { Component } from '@angular/core';
import { CustomerTableComponent } from 'src/app/components/customer-table/customer-table.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MaterialModule, CustomerTableComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {}
