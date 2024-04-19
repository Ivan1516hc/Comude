import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportsRoutingModule } from './sports-routing.module';
import { FormDocumentsComponent } from './form-documents/form-documents.component';
import { FormBankAccountComponent } from './form-bank-account/form-bank-account.component';
import { FormConpetitionComponent } from './form-conpetition/form-conpetition.component';
import { VisitorModule } from '../visitor.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormImportanArchievementComponent } from './form-importan-archievement/form-importan-archievement.component';


@NgModule({
  declarations: [
    FormDocumentsComponent,
    FormBankAccountComponent,
    FormConpetitionComponent,
    FormImportanArchievementComponent
  ],
  imports: [
    CommonModule,
    SportsRoutingModule,
    VisitorModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SportsModule { }
