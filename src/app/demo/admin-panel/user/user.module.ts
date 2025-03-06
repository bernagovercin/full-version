import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // RouterModule'ü import et
import { UserListComponent } from './user-list/user-list.component'; // UserListComponent'i impo

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    
    // UserListComponent'i buradan kaldır
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule // RouterModule'ü buraya ekle
  ]
})
export class UserModule {}