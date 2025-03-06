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
        path: 'customerList',
        loadComponent: () => import('./customer-list/customer-list.component').then((c) => c.CustomerListComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'orderList',
        loadComponent: () => import('./order-list/order-list.component').then((c) => c.OrderListComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'createInvoice',
        loadComponent: () => import('./create-invoice/create-invoice.component').then((C) => C.CreateInvoiceComponent),
        //data: { roles: [Role.Admin, Role.User] }
       
      },
      {
        path: 'orderDetails',
        loadComponent: () => import('./orders-detail/orders-detail.component').then((C) => C.OrdersDetailComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'products',
        loadComponent: () => import('./products/products.component').then((c) => c.ProductsComponent),
       // data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'productReview',
        loadComponent: () => import('./product-review/product-review.component').then((c) => c.ProductReviewComponent),
       // data: { roles: [Role.Admin, Role.User] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
