import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class MetaPixelService {
  private readonly document = inject(DOCUMENT);
  private installedId: string | null = null;

  install(pixelId: string): void {
    if (!pixelId || this.installedId === pixelId) return;
    const win = this.document.defaultView as Window | null;
    if (!win) return;

    if (!win.fbq) {
      (function (f: any, b: Document, e: string, v: string) {
        if (f.fbq) return;
        const n: any = (f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        });
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        const t = b.createElement(e) as HTMLScriptElement;
        t.async = true;
        t.src = v;
        const s = b.getElementsByTagName(e)[0];
        s.parentNode?.insertBefore(t, s);
      })(win, this.document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    }

    win.fbq('init', pixelId);

    const noscript = this.document.createElement('noscript');
    const img = this.document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${encodeURIComponent(pixelId)}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    this.document.body.appendChild(noscript);

    this.installedId = pixelId;
  }

  trackPageView(): void {
    const win = this.document.defaultView as Window | null;
    if (!win?.fbq || !this.installedId) return;
    win.fbq('track', 'PageView');
  }
}
