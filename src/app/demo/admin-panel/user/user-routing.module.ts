import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChild } from 'src/app/theme/shared/_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuardChild],
    children: [
      {
        path: 'list',
        loadComponent: () => import('./user-list/user-list.component').then((c) => c.UserListComponent),
      },
      {
        path: 'add',
        loadComponent: () => import('./user-add/user-add.component').then((c) => c.UserAddComponent),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}