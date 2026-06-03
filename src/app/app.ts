import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductDetailPage } from './pages/product-detail-page/product-detail-page';
import { Footer } from './components/footer/footer';
import { SiteDataService } from './services/site-data';

@Component({
  selector: 'app-root',
  imports: [ProductDetailPage, Footer],
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
