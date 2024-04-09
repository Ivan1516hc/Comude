import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'guarderia',
    loadChildren: () => import('./creche/creche.module').then(m => m.CrecheModule)
  },
  {
    path: 'cisz-guarderia',
    loadChildren: () => import('./cisz-creche/cisz-creche.module').then(m => m.CiszCrecheModule)
  },
  {
    path: 'beca-deportiva',
    loadChildren: () => import('./sports/sports.module').then(m => m.SportsModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {path: 'perfil', component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
