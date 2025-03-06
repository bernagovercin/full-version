// Angular import
import { AfterViewInit, Component, ElementRef, OnInit, effect, viewChild, output, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

//theme version
import { environment } from 'src/environments/environment';

// project import
import { NavigationItem, NavigationItems } from '../navigation';
import { BerryConfig } from 'src/app/app-config';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { AuthenticationService } from 'src/app/theme/shared/service/authentication.service';
import { Role } from 'src/app/theme/shared/_helpers/role';

@Component({
  selector: 'app-nav-content',
  imports: [SharedModule, CommonModule, RouterModule, NavCollapseComponent, NavGroupComponent, NavItemComponent],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.scss'
})
export class NavContentComponent implements OnInit, AfterViewInit {
  private location = inject(Location);
  private themeService = inject(ThemeService);
  authenticationService = inject(AuthenticationService);

  // public props
  NavCollapsedMob = output();
  SubmenuCollapse = output();

  // version
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;

  currentLayout!: string;
  navigations!: NavigationItem[];
  prevDisabled: string;
  nextDisabled: string;
  contentWidth: number;
  wrapperWidth!: number;
  scrollWidth: number;
  windowWidth: number;
  // eslint-disable-next-line
  collapseItem!: any;

  navbarContent = viewChild.required<ElementRef>('navbarContent');
  navbarWrapper = viewChild.required<ElementRef>('navbarWrapper');

  // Constructor
  constructor() {
    // this.navigations = NavigationItems;
    this.currentLayout = BerryConfig.layout;
    this.windowWidth = window.innerWidth;
    this.prevDisabled = 'disabled';
    this.nextDisabled = '';
    this.scrollWidth = 0;
    this.contentWidth = 0;
    effect(() => {
      this.isThemeLayout(this.themeService.themeLayout());
    });
  }

  ngOnInit() {
    if (this.windowWidth < 1025) {
        setTimeout(() => {
            (document.querySelector('.coded-navbar') as HTMLDivElement).classList.add('menupos-static');
        }, 500);
    }
    const currentUser = this.authenticationService.currentUserValue;
    const userRoles = currentUser?.user.role ? [currentUser.user.role] : [];
    this.navigations = this.filterMenu(NavigationItems, userRoles);
  }

  filterMenu(NavigationItems: NavigationItem[], userRoles: string[], parentRoles: string[] = []): NavigationItem[] {
    return NavigationItems.map((item) => {
      // If item doesn't have a specific role, inherit roles from parent
      const itemRoles = item.role ? item.role : parentRoles;

      // If item has children, recursively filter them, passing current item's roles as parentRoles
      if (item.children) {
        item.children = this.filterMenu(item.children, userRoles, itemRoles);
      }

      return item; // Return the item whether it is visible or disabled
    });
  }

  // private methods
  private isThemeLayout(layout: string) {
    this.currentLayout = layout;
  }

  ngAfterViewInit() {
    if (this.currentLayout === 'horizontal') {
      this.contentWidth = this.navbarContent().nativeElement.clientWidth;
      this.wrapperWidth = this.navbarWrapper().nativeElement.clientWidth;
    }
  }

  scrollPlus() {
    this.scrollWidth = this.scrollWidth + (this.wrapperWidth - 200);
    if (this.scrollWidth > this.contentWidth - this.wrapperWidth) {
      this.scrollWidth = this.contentWidth - this.wrapperWidth + 200;
      this.nextDisabled = 'disabled';
    }
    this.prevDisabled = '';
    (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginLeft = '-' + this.scrollWidth + 'px';
  }

  scrollMinus() {
    this.scrollWidth = this.scrollWidth - this.wrapperWidth;
    if (this.scrollWidth < 0) {
      this.scrollWidth = 0;
      this.prevDisabled = 'disabled';
    }
    this.nextDisabled = '';
    (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginLeft = '-' + this.scrollWidth + 'px';
  }

  fireLeave() {
    const sections = document.querySelectorAll('.coded-hasmenu');
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('active');
      sections[i].classList.remove('coded-trigger');
    }

    let current_url = this.location.path();
    //eslint-disable-next-line
    // @ts-ignore
    if (this.location['_baseHref']) {
      //eslint-disable-next-line
      // @ts-ignore
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('active');
      }
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    // eslint-disable-next-line
    // @ts-ignore
    if (this.location['_baseHref']) {
      // eslint-disable-next-line
      // @ts-ignore
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        if (this.currentLayout === 'vertical') {
          parent.classList.add('coded-trigger');
        }
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        if (this.currentLayout === 'vertical') {
          up_parent.classList.add('coded-trigger');
        }
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        if (this.currentLayout === 'vertical') {
          last_parent.classList.add('coded-trigger');
        }
        last_parent.classList.add('active');
      }
    }
  }

  navMob() {
    if (this.windowWidth < 1025 && document.querySelector('app-navigation.coded-navbar')?.classList.contains('mob-open')) {
      this.NavCollapsedMob.emit();
    }
  }

  subMenuCollapse(item: { children: string | undefined }) {
    this.SubmenuCollapse.emit();
    this.collapseItem = item.children;
  }
}
