import { Routes } from '@angular/router';

// ui
import { StoreComponent } from './store/store.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const StoreRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StoreComponent,
      },
      {
        path: 'cart',
        component: ShoppingCartComponent,
      },
    ],
  },
];
