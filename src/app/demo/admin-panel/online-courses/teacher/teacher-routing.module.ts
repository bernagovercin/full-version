import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChild } from 'src/app/theme/shared/_helpers/auth.guard';

// project import
//import { Role } from 'src/app/theme/shared/_helpers/role';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuardChild],
    children: [
      {
        path: 'list',
        loadComponent: () => import('./teacher-list/teacher-list.component').then((c) => c.TeacherListComponent),
       // data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'apply',
        loadComponent: () => import('./teacher-apply/teacher-apply.component').then((c) => c.TeacherApplyComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'add',
        loadComponent: () => import('./teacher-add/teacher-add.component').then((c) => c.TeacherAddComponent),
        //data: { roles: [Role.Admin] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
