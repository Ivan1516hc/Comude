import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { VisitorModule } from '../visitor.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MexicanCurrencyPipe } from 'src/app/pipes/mexican-currency.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    MexicanCurrencyPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    VisitorModule,
    NgxDocViewerModule
  ]
})
export class DashboardModule { }
