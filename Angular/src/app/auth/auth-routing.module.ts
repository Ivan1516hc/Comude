import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetComponent } from './pages/reset/reset.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'admin-login', component: LoginAdminComponent },
    { path: 'registrar', component: RegisterComponent },
    { path: 'restablecer/:token/:email', component: ResetComponent },
    { path: 'verificar/:email', component: VerifyComponent },
    { path: '**', redirectTo: 'login' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
