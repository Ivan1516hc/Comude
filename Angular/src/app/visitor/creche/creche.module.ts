import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrecheRoutingModule } from './creche-routing.module';
import { FormChildComponent } from './form-child/form-child.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormParentsComponent } from './form-parents/form-parents.component';
import { FormHousingComponent } from './form-housing/form-housing.component';
import { FormReferencesComponent } from './form-references/form-references.component';
import { VisitorModule } from '../visitor.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormDocumentsComponent } from './form-documents/form-documents.component';


@NgModule({
  declarations: [
    FormChildComponent,
    FormParentsComponent,
    FormHousingComponent,
    FormReferencesComponent,
    FormDocumentsComponent
  ],
  imports: [
    CommonModule,
    CrecheRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    VisitorModule,
        GoogleMapsModule,
  ],
  exports: [FormChildComponent, FormReferencesComponent]
})
export class CrecheModule { }
