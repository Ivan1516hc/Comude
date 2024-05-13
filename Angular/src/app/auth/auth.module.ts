import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetComponent } from './pages/reset/reset.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    VerifyComponent,
    LoginAdminComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
