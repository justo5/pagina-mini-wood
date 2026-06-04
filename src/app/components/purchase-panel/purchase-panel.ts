import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { SiteDataService } from '../../services/site-data';

@Component({
  selector: 'app-purchase-panel',
  templateUrl: './purchase-panel.html',
  styleUrl: './purchase-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchasePanel {
  readonly product = input.required<Product>();
  readonly whatsappUrl = inject(SiteDataService).site()?.social.whatsapp;
}
