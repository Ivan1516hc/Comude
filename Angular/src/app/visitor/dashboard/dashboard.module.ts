import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { VisitorModule } from '../visitor.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    VisitorModule
  ]
})
export class DashboardModule { }
