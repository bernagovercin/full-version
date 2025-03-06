// Angular import
import { Component, OnInit, effect, output, inject, input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

// project import
import { NavigationItem } from '../../navigation';
import { BerryConfig } from 'src/app/app-config';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavItemComponent } from '../nav-item/nav-item.component';
import { AuthenticationService } from 'src/app/theme/shared/service/authentication.service';

@Component({
  selector: 'app-nav-collapse',
  imports: [CommonModule, SharedModule, RouterModule, NavItemComponent],
  templateUrl: './nav-collapse.component.html',
  styleUrl: './nav-collapse.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', display: 'block' }),
        animate('250ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [animate('250ms ease-in', style({ transform: 'translateY(-100%)' }))])
    ])
  ]
})
export class NavCollapseComponent implements OnInit {
  private themeService = inject(ThemeService);
  private location = inject(Location);
  private authenticationService = inject(AuthenticationService);

  // public props
  showCollapseItem = output();
  item = input.required<NavigationItem>();
  parentRole = input<string[]>();
  currentLayout!: string;
  windowWidth = window.innerWidth;
  current_url: string = ''; // Add current URL property
  isEnabled: boolean = false;

  constructor() {
    effect(() => {
      this.isThemeLayout(this.themeService.themeLayout());
    });
  }

  ngOnInit() {
    this.currentLayout = BerryConfig.layout;
    this.current_url = this.location.path();

    // eslint-disable-next-line
    //@ts-ignore
    const baseHref = this.location['_baseHref'] || ''; // Use baseHref if necessary
    this.current_url = baseHref + this.current_url;

    // Timeout to allow DOM to fully render before checking for the links
    setTimeout(() => {
      const links = document.querySelectorAll('a.nav-link') as NodeListOf<HTMLAnchorElement>;
      links.forEach((link: HTMLAnchorElement) => {
        if (link.getAttribute('href') === this.current_url) {
          let parent = link.parentElement;
          while (parent && parent.classList) {
            if (parent.classList.contains('coded-hasmenu')) {
              if (this.currentLayout === 'vertical') {
                parent.classList.add('coded-trigger');
              }
              parent.classList.add('active');
            }
            parent = parent.parentElement;
          }
        }
      });
    }, 0);

    const currentUserRole = this.authenticationService.currentUserValue?.user.role || 'Admin';
    const parentRoleValue = this.parentRole();
    const item = this.item();
    if (item.role && item.role.length > 0) {
      if (currentUserRole) {
        const parentRole = this.parentRole();
        const allowedFromParent = item.isMainParent || (parentRole && parentRole.length > 0 && parentRole.includes(currentUserRole));
        if (allowedFromParent) {
          this.isEnabled = item.role.includes(currentUserRole);
        }
      }
    } else if (parentRoleValue && parentRoleValue.length > 0) {
      if (currentUserRole) {
        this.isEnabled = parentRoleValue.includes(currentUserRole);
      }
    }
  }

  // Method to handle the collapse of the navigation menu
  navCollapse(e: MouseEvent) {
    let parent = e.target as HTMLElement;

    if (parent?.tagName === 'SPAN') {
      parent = parent.parentElement!;
    }

    if (this.currentLayout === 'vertical') {
      parent = (parent as HTMLElement).parentElement!;
    }

    const sections = document.querySelectorAll('.coded-hasmenu');
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] !== parent) {
        sections[i].classList.remove('coded-trigger');
      }
    }

    let first_parent = parent.parentElement!;
    let pre_parent = ((parent as HTMLElement).parentElement as HTMLElement).parentElement!;
    if (first_parent.classList.contains('coded-hasmenu')) {
      do {
        first_parent.classList.add('coded-trigger');
        first_parent = (first_parent.parentElement as HTMLElement).parentElement!;
      } while (first_parent.classList.contains('coded-hasmenu'));
    } else if (pre_parent.classList.contains('coded-submenu')) {
      do {
        pre_parent.parentElement?.classList.add('coded-trigger');
        pre_parent = (((pre_parent as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement).parentElement!;
      } while (pre_parent.classList.contains('coded-submenu'));
    }
    parent.classList.toggle('coded-trigger');
  }

  subMenuCollapse(item: void) {
    this.showCollapseItem.emit(item);
  }

  // private methods
  private isThemeLayout(layout: string) {
    this.currentLayout = layout;
  }
}
