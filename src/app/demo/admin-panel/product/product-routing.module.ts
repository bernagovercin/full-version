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
        loadComponent: () => import('./product-view/product-view.component').then((c) => c.ProductViewComponent),
        //data: { role: [Role.Admin, Role.User] }
      },
      {
        path: 'add',
        loadComponent: () => import('./product-add/product-add.component').then((c) => c.ProductAddComponent),
        //data: { role: [Role.Admin] }
      },
      {
        path: 'list',
        loadComponent: () => import('./product-list/product-list.component').then((c) => c.ProductListComponent),
       // data: { role: [Role.Admin] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}