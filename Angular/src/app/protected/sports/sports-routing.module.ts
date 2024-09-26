import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidationComponent } from './validation/validation.component';
import { AppraisalComponent } from './appraisal/appraisal.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { HistoricalComponent } from './historical/historical.component';
import { ApprovalsComponent } from './approvals/approvals.component';

const routes: Routes = [{
  path: '',
  children:[
    {path: 'dashboard', component:DashboardComponent},
    {path: 'validaciones', component:ValidationComponent},
    {path: 'evaluaciones-comite', component:AppraisalComponent},
    {path: 'beneficiarios', component:BeneficiariesComponent},
    {path: 'catalogos', component:CatalogsComponent},
    {path: 'historico', component:HistoricalComponent},
    {path: 'aprobaciones', component:ApprovalsComponent},
    //------------------------------------------------------------------------------------------------------
    {path: '**', redirectTo: 'dashboard'},
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule { }
