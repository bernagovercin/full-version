import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChild } from 'src/app/theme/shared/_helpers/auth.guard';

// project import
import { Role } from 'src/app/theme/shared/_helpers/role';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuardChild],
    children: [
      {
        path: 'view',
        loadComponent: () => import('./order-view/order-view.component').then((c) => c.OrderViewComponent),
        //data: { role: [Role.Admin, Role.User] }
      },
      {
        path: 'add',
        loadComponent: () => import('./order-add/order-add.component').then((c) => c.OrderAddComponent),
       // data: { role: [Role.Admin] }
      },
      {
        path: 'orderList',
        loadComponent: () => import('./order-list/order-list.component').then((c) => c.OrderListComponent),
       // data: { roles: [Role.Admin, Role.User] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}