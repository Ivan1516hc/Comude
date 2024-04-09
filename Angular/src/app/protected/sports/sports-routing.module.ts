import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from './requests/requests.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  children:[
    {path: 'dashboard', component:DashboardComponent},
    {path: 'solicitudes', component:RequestsComponent},
    {path: 'beneficiarios', component:BeneficiariesComponent},
    //------------------------------------------------------------------------------------------------------
    {path: '**', redirectTo: 'dashboard'},
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule { }
