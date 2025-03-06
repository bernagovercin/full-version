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
        path: 'list',
        loadComponent: () => import('./customer-list/customer-list.component').then((c) => c.CustomerListComponent),
       //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'add',
        loadComponent: () => import('./customer-add/customer-add.component').then((c) => c.CustomerAddComponent),
       //data: { roles: [Role.Admin] }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
