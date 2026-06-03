import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-info',
  imports: [CurrencyPipe],
  templateUrl: './product-info.html',
  styleUrl: './product-info.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfo {
  readonly product = input.required<Product>();
}
