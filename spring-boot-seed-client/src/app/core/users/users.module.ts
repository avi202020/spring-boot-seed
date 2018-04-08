import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user/user.component';
import {UsersComponent} from './users/users.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserService} from '../../shared/services/user.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';
import {CreateUserComponent} from './create-user/create-user.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,

    SharedComponentsModule
  ],
  providers: [
    UserService
  ],
  declarations: [
    UserComponent,
    UsersComponent,
    UserFormComponent,
    CreateUserComponent
  ],
  exports: [
    UserComponent,
    UsersComponent,
    UserFormComponent
  ]
})
export class UsersModule { }
