import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product, SiteConfig, SiteData } from '../models/product';

@Injectable({ providedIn: 'root' })
export class SiteDataService {
  private readonly http = inject(HttpClient);

  private readonly _data = signal<SiteData | null>(null);
  private loadPromise: Promise<SiteData> | null = null;

  readonly data = this._data.asReadonly();
  readonly products = computed<Product[]>(() => this._data()?.products ?? []);
  readonly site = computed<SiteConfig | null>(() => this._data()?.site ?? null);

  load(): Promise<SiteData> {
    if (this.loadPromise) return this.loadPromise;
    this.loadPromise = firstValueFrom(
      this.http.get<SiteData>('data/site.json'),
    ).then((data) => {
      this._data.set(data);
      return data;
    });
    return this.loadPromise;
  }

  getById(id: string): Product | undefined {
    return this.products().find((p) => p.id === id);
  }
}
