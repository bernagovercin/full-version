// Angular Imports
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
        path: 'ec-product',
        loadComponent: () => import('./product/product.component').then((c) => c.ProductComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'ec-product-detail',
        loadComponent: () => import('./product-details/product-details.component').then((c) => c.ProductDetailsComponent),
       // data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'ec-product-list',
        loadComponent: () => import('./product-list/product-list.component').then((c) => c.ProductListComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule {}
