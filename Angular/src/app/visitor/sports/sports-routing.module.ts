import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConpetitionComponent } from './form-conpetition/form-conpetition.component';
import { FormDocumentsComponent } from './form-documents/form-documents.component';
import { FormBankAccountComponent } from './form-bank-account/form-bank-account.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: ':id/competicion', component: FormConpetitionComponent },
    { path: ':id/documentacion', component: FormDocumentsComponent },
    { path: ':id/cuenta-bancaria', component: FormBankAccountComponent },
    //------------------------------------------------------------------------------------------------------
    { path: '**', redirectTo: 'home' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule { }
