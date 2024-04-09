import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiszCrecheRoutingModule } from './cisz-creche-routing.module';
import { FormParentComponent } from './form-parent/form-parent.component';
import { VisitorModule } from '../visitor.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrecheModule } from '../creche/creche.module';
import { FormDocumentsComponent } from './form-documents/form-documents.component';


@NgModule({
  declarations: [
    FormParentComponent,
    FormDocumentsComponent
  ],
  imports: [
    CommonModule,
    CiszCrecheRoutingModule,
    VisitorModule,
    ReactiveFormsModule,
    FormsModule,
    CrecheModule
  ]
})
export class CiszCrecheModule { }
