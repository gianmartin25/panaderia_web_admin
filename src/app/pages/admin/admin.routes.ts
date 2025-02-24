import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { AdminEmployeesComponent } from './employees/employees.component';
import { ProductsComponent } from './products/products.component';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { SalesComponent } from './sales/sales.component';
import { CustomersComponent } from './customers/customers.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'employees',
        component: AdminEmployeesComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products-inventory',
        component: ProductInventoryComponent,
      },
      {
        path: 'sale',
        component: AppTablesComponent,
      },
      {
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: 'carriers',
        component: AppTablesComponent,
      },
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
    ],
  },
];
