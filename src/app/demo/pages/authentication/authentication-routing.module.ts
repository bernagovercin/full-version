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
        path: 'auth3',
        loadChildren: () => import('./authentication-v3/authentication-v3.module').then((m) => m.AuthenticationV3Module),
       //data: { roles: [Role.Admin, Role.User] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
