import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportsRoutingModule } from './sports-routing.module';
import { FormDocumentsComponent } from './form-documents/form-documents.component';
import { FormBankAccountComponent } from './form-bank-account/form-bank-account.component';
import { FormConpetitionComponent } from './form-conpetition/form-conpetition.component';
import { VisitorModule } from '../visitor.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormDocumentsComponent,
    FormBankAccountComponent,
    FormConpetitionComponent
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
