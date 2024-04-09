import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarRolTramiteGuard } from './guards/validar-rol-tramite.guard';
import { validarUserGuard } from './guards/validar-user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivateChild: [ValidarRolTramiteGuard],
    data: { expectedRoles: [2], expectedPlatforms: [1] }
  },
  {
    path: 'solicitante',
    loadChildren: () => import('./visitor/visitor.module').then(m => m.VisitorModule),
    canActivateChild: [validarUserGuard]
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./visitor/homepage/homepage.module').then(m => m.HomepageModule),
  // },
  {
    path: '**',
    redirectTo: ''
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
