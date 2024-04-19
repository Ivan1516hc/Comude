import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConpetitionComponent } from './form-conpetition/form-conpetition.component';
import { FormDocumentsComponent } from './form-documents/form-documents.component';
import { FormBankAccountComponent } from './form-bank-account/form-bank-account.component';
import { FormImportanArchievementComponent } from './form-importan-archievement/form-importan-archievement.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: ':id/competicion', component: FormConpetitionComponent },
    { path: ':id/documentacion', component: FormDocumentsComponent },
    { path: ':id/cuenta-bancaria', component: FormBankAccountComponent },
    { path: ':id/logros-importantes', component: FormImportanArchievementComponent },
    //------------------------------------------------------------------------------------------------------
    { path: '**', redirectTo: 'home' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule { }
