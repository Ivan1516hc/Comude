import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidationComponent } from './validation/validation.component';
import { AppraisalComponent } from './appraisal/appraisal.component';

const routes: Routes = [{
  path: '',
  children:[
    {path: 'dashboard', component:DashboardComponent},
    {path: 'validaciones', component:ValidationComponent},
    {path: 'evaluaciones-comite', component:AppraisalComponent},
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
