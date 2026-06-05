import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { SiteDataService } from '../../services/site-data';
import { MetaPixelService } from '../../services/meta-pixel';

@Component({
  selector: 'app-purchase-panel',
  templateUrl: './purchase-panel.html',
  styleUrl: './purchase-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchasePanel {
  private readonly metaPixel = inject(MetaPixelService);
  readonly product = input.required<Product>();
  readonly whatsappUrl = inject(SiteDataService).site()?.social.whatsapp;

  trackContact(): void {
    this.metaPixel.trackEvent('Contact');
  }
}
