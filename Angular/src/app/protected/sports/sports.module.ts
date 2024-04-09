import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportsRoutingModule } from './sports-routing.module';
import { RequestsComponent } from './requests/requests.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SportsComponent } from './sports.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RequestsComponent,
    BeneficiariesComponent,
    DashboardComponent,
    SportsComponent
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
