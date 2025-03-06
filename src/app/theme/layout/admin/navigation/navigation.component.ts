// Angular import
import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, output, inject } from '@angular/core';
import { Router } from '@angular/router';

// project import
import { BerryConfig } from 'src/app/app-config';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavContentComponent } from './nav-content/nav-content.component';

@Component({
  selector: 'app-navigation',
  imports: [SharedModule, NavContentComponent, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  router = inject(Router);
  private themeService = inject(ThemeService);

  // public props
  NavCollapsedMob = output();
  SubmenuCollapse = output();
  navCollapsedMob = false;
  windowWidth = window.innerWidth;
  themeMode!: string;

  // constructor
  constructor() {
    effect(() => {
      this.isThemeLayout(this.themeService.themeLayout());
    });
  }

  ngOnInit() {
    this.themeMode = BerryConfig.layout;
  }

  // private method
  private isThemeLayout(layout: string) {
    this.themeMode = layout;
  }

  // public method
  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }

  navSubmenuCollapse() {
    document.querySelector('app-navigation.coded-navbar')?.classList.add('coded-trigger');
  }

  returnHome() {
    this.router.navigate(['/default']);
  }
}
