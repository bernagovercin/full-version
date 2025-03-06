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
        path: 'customer',
        loadComponent: () => import('./helpdesk-customer/helpdesk-customer.component').then((c) => c.HelpdeskCustomerComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'warehouse',  // Değiştirildi
        loadComponent: () => import('./helpdesk-warehouse/helpdesk-warehouse.component').then((c) => c.HelpdeskWarehouseComponent),  // Değiştirildi
       // data: { roles: [Role.Admin, Role.User] }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpdeskRoutingModule {}
