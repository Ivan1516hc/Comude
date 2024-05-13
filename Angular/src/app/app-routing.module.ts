import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validarUserGuard } from './guards/validar-user.guard';
import { validarAdminGuard } from './guards/validar-admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'solicitante/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivateChild: [validarAdminGuard]
  },
  {
    path: 'solicitante',
    loadChildren: () => import('./visitor/visitor.module').then(m => m.VisitorModule),
    canActivateChild: [validarUserGuard]
  },
  {
    path: '**',
    redirectTo: 'solicitante/dashboard'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
