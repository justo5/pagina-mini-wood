import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductDetailPage } from './pages/product-detail-page/product-detail-page';
import { SiteDataService } from './services/site-data';

@Component({
  selector: 'app-root',
  imports: [ProductDetailPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly siteData = inject(SiteDataService);
  readonly site = this.siteData.site;

  constructor() {
    this.siteData.load();
  }
}
