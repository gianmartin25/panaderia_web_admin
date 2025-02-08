import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent { }
