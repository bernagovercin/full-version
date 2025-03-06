// Angular Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuardChild } from './theme/shared/_helpers/auth.guard';
//import { Role } from './theme/shared/_helpers/role';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./demo/pages/authentication/authentication-v3/v3-login/v3-login.component').then((c) => c.V3LoginComponent)
      },
      //{
      //  path: 'landing',
       // loadComponent: () => import('./demo/pages/landing/landing.component').then((c) => c.LandingComponent)
      //},
      {
        
        path: 'maintenance',
        loadChildren: () => import('./demo/pages/maintenance/maintenance.module').then((m) => m.MaintenanceModule)
      },
      {
        path: 'auth',
       // canActivateChild: [AuthGuardChild],
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
       //data: { roles: [Role.Admin] }
       
      },
      {
        path: 'unauthorized',
        loadComponent: () =>
          import('./demo/pages/maintenance/unauthorize-error/unauthorize-error.component').then((c) => c.UnauthorizeErrorComponent)
      },
      {
        path: 'layout',
        loadChildren: () => import('./demo/layout/layout.module').then((m) => m.LayoutModule)
      },
      {
        path: 'samplePage',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component').then((c) => c.SamplePageComponent)
      },
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [AuthGuardChild],
    children: [
      {
        path: 'online-course',
        loadComponent: () => import('./demo/admin-panel/online-courses/online-courses.module').then((c) => c.OnlineCoursesModule),
        //data: { roles: [Role.Admin ] }
      },
     
      {
        path: 'user',
        loadChildren: () => import('./demo/admin-panel/user/user.module').then((m) => m.UserModule),
        //data: { roles: [Role.Admin] }
      },
      {
        path: 'customer',
        loadChildren: () => import('./demo/admin-panel/customer/customer.module').then((m) => m.CustomerModule),
        //data: { roles: [Role.Admin] }
      },
      {
        path: 'product',
        loadChildren: () => import('./demo/admin-panel/product/product.module').then((m) => m.ProductModule),
        //data: { roles: [Role.Admin] }
      },
      {
        path: 'order',
        loadChildren: () => import('./demo/admin-panel/order/order.module').then((m) => m.OrderModule),
        //data: { roles: [Role.Admin] }
      },
      {
        path: 'error-form',
        loadComponent: () => import('./demo/tables/error-form/error-form.component').then((c) => c.ErrorFormComponent),
       //data: { roles: [Role.Admin] }
      },
      {
        path: 'error-list',
        loadComponent: () => import('./demo/tables/error-list/error-list.component').then((c) => c.ErrorListComponent),
        //data: { roles: [Role.Admin] }
      },
      
     
      {
        path: 'online-course',
        loadChildren: () => import('./demo/admin-panel/online-courses/online-courses.module').then((m) => m.OnlineCoursesModule),
        //data: { roles: [Role.Admin] }
      },
      {
        path: 'helpdesk',
        loadChildren: () => import('./demo/admin-panel/helpdesk/helpdesk.module').then((m) => m.HelpdeskModule),
       //data: { roles: [Role.Admin] }
      },
      {
        path: 'customer',
        loadChildren: () => import('./demo/application/customer/customer.module').then((m) => m.CustomerModule),
        //data: { roles: [Role.Admin] }
      },
      {
        path: 'ec',
        loadChildren: () => import('./demo/application//ecommerce/ecommerce.module').then((m) => m.EcommerceModule),
        //data: { roles: [Role.Admin] }
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/elements/basic/basic.module').then((m) => m.BasicModule),
        //data: { roles: [Role.Admin] }
      },
      {
        path: 'advance',
        loadChildren: () => import('./demo/elements/advance/advance.module').then((m) => m.AdvanceModule),
        //data: { roles: [Role.Admin] }
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/forms/form-elements/form-elements.module').then((m) => m.FormElementsModule),
       // data: { roles: [Role.Admin] }
      },
      {
        path: 'fPlugin',
        loadChildren: () => import('./demo/forms/form-plugin/form-plugin.module').then((m) => m.FormPluginModule),
        //data: { roles: [Role.Admin] }
      },
      {
        path: 'form-validation',
        loadComponent: () => import('./demo/forms/form-validation/form-validation.component').then((c) => c.FormValidationComponent),
        //data: { roles: [Role.Admin] }
      },
      
      {
        path: 'form-layout',
        loadChildren: () => import('./demo/forms/form-layout/form-layout.module').then((m) => m.FormLayoutModule),
       // data: { roles: [Role.Admin] }
      },
      {
        path: 'dataTables',
        loadComponent: () => import('./demo/tables/tbl-data-table/tbl-data-table.component').then((c) => c.TblDataTableComponent),
       // data: { roles: [Role.Admin] }
      },
     
      {
        path: 'samplePage',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component').then((c) => c.SamplePageComponent)
      },
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./demo/pages/maintenance/maintain-error/maintain-error.component').then((c) => c.MaintainErrorComponent)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
