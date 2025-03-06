// Angular import
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

// project import
import { BerryConfig } from 'src/app/app-config';
import { ConfigurationComponent } from '../admin/configuration/configuration.component';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';

@Component({
  selector: 'app-guest',
  imports: [ConfigurationComponent, RouterModule],
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);

  // public props
  presetColor!: string;

  // Life cycle events
  ngOnInit(): void {
    this.presetColor = BerryConfig.theme_color;
    this.themeService.isLandingPage.set(true);
  }

  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('landing-page');
  }
}
