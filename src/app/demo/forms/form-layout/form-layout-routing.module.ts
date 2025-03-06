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
        path: 'actionBars',
        loadComponent: () => import('./form-actionbars/form-actionbars.component').then((c) => c.FormActionbarsComponent),
       // data: { role: [Role.Admin, Role.User] }
      },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormLayoutRoutingModule {}
