import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { VisitorModule } from '../visitor.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { SharedModule } from 'src/app/protected/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    VisitorModule,
    NgxDocViewerModule,
    SharedModule
  ]
})
export class DashboardModule { }
