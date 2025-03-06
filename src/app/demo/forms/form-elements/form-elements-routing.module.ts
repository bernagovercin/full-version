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
        path: 'options',
        loadComponent: () => import('./form-options/form-options.component').then((c) => c.FormOptionsComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormElementsRoutingModule {}
