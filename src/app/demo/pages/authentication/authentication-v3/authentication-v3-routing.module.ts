// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// project import
//import { Role } from 'src/app/theme/shared/_helpers/role';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./v3-login/v3-login.component').then((c) => c.V3LoginComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'register',
        loadComponent: () => import('./v3-register/v3-register.component').then((c) => c.V3RegisterComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'forgetPassword',
        loadComponent: () => import('./v3-fr-password/v3-fr-password.component').then((c) => c.V3FrPasswordComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'checkMail',
        loadComponent: () => import('./v3-check-mail/v3-check-mail.component').then((c) => c.V3CheckMailComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'resetpassword',
        loadComponent: () => import('./v3-reset-password/v3-reset-password.component').then((c) => c.V3ResetPasswordComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'codeVerification',
        loadComponent: () => import('./v3-code-verify/v3-code-verify.component').then((c) => c.V3CodeVerifyComponent),
        //data: { roles: [Role.Admin, Role.User] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationV3RoutingModule {}
