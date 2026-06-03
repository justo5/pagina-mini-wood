import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/product';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalCount = computed(() =>
    this._items().reduce((acc, item) => acc + item.quantity, 0),
  );

  addItem(productId: string, quantity: number): void {
    this._items.update((items) => {
      const index = items.findIndex((i) => i.productId === productId);
      if (index === -1) {
        return [...items, { productId, quantity }];
      }
      const next = [...items];
      next[index] = { ...next[index], quantity: next[index].quantity + quantity };
      return next;
    });
  }
}
