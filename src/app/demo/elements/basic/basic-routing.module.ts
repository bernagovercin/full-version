// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// project import
import { Role } from 'src/app/theme/shared/_helpers/role';

const routes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'button',
        loadComponent: () => import('./basic-button/basic-button.component').then((c) => c.BasicButtonComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'badges',
        loadComponent: () => import('./basic-badges/basic-badges.component').then((c) => c.BasicBadgesComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'cards',
        loadComponent: () => import('./basic-cards/basic-cards.component').then((c) => c.BasicCardsComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'carousel',
        loadComponent: () => import('./basic-carousel/basic-carousel.component').then((c) => c.BasicCarouselComponent),
       // data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'collapse',
        loadComponent: () => import('./basic-collapse/basic-collapse.component').then((c) => c.BasicCollapseComponent),
       // data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'dropdowns',
        loadComponent: () => import('./basic-dropdowns/basic-dropdowns.component').then((c) => c.BasicDropdownsComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'offcanvas',
        loadComponent: () => import('./basic-offcanvas/basic-offcanvas.component').then((c) => c.BasicOffcanvasComponent),
      //  data: { roles: [Role.Admin, Role.User] }
      },
     
     
      {
        path: 'modal',
        loadComponent: () => import('./basic-modal/basic-modal.component').then((c) => c.BasicModalComponent),
       // data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'spinner',
        loadComponent: () => import('./basic-spinner/basic-spinner.component').then((c) => c.BasicSpinnerComponent),
       // data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'tabs-pills',
        loadComponent: () => import('./basic-tabs-pills/basic-tabs-pills.component').then((c) => c.BasicTabsPillsComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'toasts',
        loadComponent: () => import('./toasts/toasts.component').then((c) => c.ToastsComponent),
       // data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'other',
        loadComponent: () => import('./basic-other/basic-other.component').then((c) => c.BasicOtherComponent),
        //data: { roles: [Role.Admin, Role.User] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule {}
