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
        loadComponent: () => import('./courses-view/courses-view.component').then((c) => c.CoursesViewComponent),
       // data: { role: [Role.Admin, Role.User] }
      },
      {
        path: 'add',
        loadComponent: () => import('./courses-add/courses-add.component').then((c) => c.CoursesAddComponent),
        //data: { role: [Role.Admin] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
