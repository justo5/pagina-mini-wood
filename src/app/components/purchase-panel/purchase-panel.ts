import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-purchase-panel',
  templateUrl: './purchase-panel.html',
  styleUrl: './purchase-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchasePanel {
  readonly product = input.required<Product>();
}
