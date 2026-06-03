import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ProductGallery } from '../../components/product-gallery/product-gallery';
import { ProductInfo } from '../../components/product-info/product-info';
import { PurchasePanel } from '../../components/purchase-panel/purchase-panel';
import { SiteDataService } from '../../services/site-data';

@Component({
  selector: 'app-product-detail-page',
  imports: [ProductGallery, ProductInfo, PurchasePanel],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailPage {
  private readonly siteData = inject(SiteDataService);

  readonly products = this.siteData.products;
  readonly selectedId = signal<string | null>(null);

  readonly selectedProduct = computed(() => {
    const list = this.products();
    if (list.length === 0) return null;
    const id = this.selectedId();
    return list.find((p) => p.id === id) ?? list[0];
  });

  constructor() {
    this.siteData.load().then((data) => {
      if (data.products.length > 0) this.selectedId.set(data.products[0].id);
    });
  }

  selectProduct(id: string): void {
    this.selectedId.set(id);
  }
}
