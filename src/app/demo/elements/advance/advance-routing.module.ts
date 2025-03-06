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
        path: 'sweetAlert',
        loadComponent: () => import('./sweet-alert/sweet-alert.component').then((c) => c.SweetAlertComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      
      {
        path: 'lightbox',
        loadComponent: () => import('./adv-lightbox/adv-lightbox.component').then((c) => c.AdvLightboxComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'modal',
        loadComponent: () => import('./advance-modal/advance-modal.component').then((c) => c.AdvanceModalComponent),
       //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'notification',
        loadChildren: () => import('./adv-notification/adv-notification.module').then((e) => e.AdvNotificationModule),
        //data: { roles: [Role.Admin, Role.User] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvanceRoutingModule {}
