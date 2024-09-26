import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { SportsRoutingModule } from './sports-routing.module';
import { RequestsComponent } from './requests/requests.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SportsComponent } from './sports.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppraisalComponent } from './appraisal/appraisal.component';
import { ValidationComponent } from './validation/validation.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { UserCatalogComponent } from './user-catalog/user-catalog.component';
import { DisciplineCatalogComponent } from './discipline-catalog/discipline-catalog.component';
import { DocumentProcedureCatalogComponent } from './document-procedure-catalog/document-procedure-catalog.component';
import { JustificationTypeCatalogComponent } from './justification-type-catalog/justification-type-catalog.component';
import { HistoricalComponent } from './historical/historical.component';
import { ApprovalsComponent } from './approvals/approvals.component';


@NgModule({
  declarations: [
    RequestsComponent,
    BeneficiariesComponent,
    DashboardComponent,
    SportsComponent,
    AppraisalComponent,
    ValidationComponent,
    CatalogsComponent,
    UserCatalogComponent,
    DisciplineCatalogComponent,
    DocumentProcedureCatalogComponent,
    JustificationTypeCatalogComponent,
    HistoricalComponent,
    ApprovalsComponent
  ],
  imports: [
    CommonModule,
    SportsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SportsModule { }
