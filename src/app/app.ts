import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductDetailPage } from './pages/product-detail-page/product-detail-page';
import { SiteDataService } from './services/site-data';
import { MetaPixelService } from './services/meta-pixel';

@Component({
  selector: 'app-root',
  imports: [ProductDetailPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly siteData = inject(SiteDataService);
  private readonly metaPixel = inject(MetaPixelService);
  readonly site = this.siteData.site;

  constructor() {
    this.siteData.load().then((data) => {
      const pixelId = data.site?.analytics?.metaPixelId;
      if (pixelId) {
        this.metaPixel.install(pixelId);
        this.metaPixel.trackPageView();
      }
    });
  }

  trackContact(): void {
    this.metaPixel.trackEvent('Contact');
  }
}
