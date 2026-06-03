import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SiteDataService } from '../../services/site-data';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly siteData = inject(SiteDataService);

  readonly social = computed(() => this.siteData.site()?.social ?? null);
  readonly year = new Date().getFullYear();
}
