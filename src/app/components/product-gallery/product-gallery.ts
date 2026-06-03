import { ChangeDetectionStrategy, Component, computed, HostListener, input, signal } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGallery {
  readonly product = input.required<Product>();

  readonly activeIndex = signal(0);
  readonly activeImage = computed(() => this.product().images[this.activeIndex()]);
  readonly isLightboxOpen = signal(false);

  select(index: number): void {
    this.activeIndex.set(index);
  }

  next(): void {
    const total = this.product().images.length;
    this.activeIndex.update((i) => (i + 1) % total);
  }

  prev(): void {
    const total = this.product().images.length;
    this.activeIndex.update((i) => (i - 1 + total) % total);
  }

  openLightbox(): void {
    this.isLightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.isLightboxOpen()) return;
    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'ArrowLeft') {
      this.prev();
    }
  }
}
