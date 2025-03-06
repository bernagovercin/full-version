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
        path: 'list',
        loadComponent: () => import('./student-list/student-list.component').then((c) => c.StudentListComponent),
       // data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'apply',
        loadComponent: () => import('./student-apply/student-apply.component').then((c) => c.StudentApplyComponent),
        //data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'add',
        loadComponent: () => import('./student-add/student-add.component').then((c) => c.StudentAddComponent),
        //data: { roles: [Role.Admin] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
