// Angular import
import { Component, Input, OnInit, effect, output, inject } from '@angular/core';
import { Router } from '@angular/router';

// project import
import { BerryConfig } from 'src/app/app-config';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-logo',
  imports: [SharedModule],
  templateUrl: './nav-logo.component.html',
  styleUrl: './nav-logo.component.scss'
})
export class NavLogoComponent implements OnInit {
  router = inject(Router);
  private themeService = inject(ThemeService);

  // public props
  @Input() navCollapsed!: boolean;
  NavCollapse = output();
  windowWidth: number;
  themeMode!: boolean;

  // Constructor
  constructor() {
    this.windowWidth = window.innerWidth;
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkTheme());
    });
  }

  // life cycle event
  ngOnInit() {
    this.themeMode = BerryConfig.isDarkMode;
  }

  // private method
  private isDarkTheme(isDark: boolean) {
    this.themeMode = isDark;
  }

  // public method
  navCollapse() {
    if (this.windowWidth >= 1025) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  returnToHome() {
    this.router.navigate(['/default']);
  }
}
