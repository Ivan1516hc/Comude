import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorRoutingModule } from './visitor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { VisitorComponent } from './visitor.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderHomepageComponent } from './shared/header-homepage/header-homepage.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    HeaderComponent,
    VisitorComponent,
    FooterComponent,
    HeaderHomepageComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    VisitorRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [VisitorComponent, HeaderHomepageComponent]
})
export class VisitorModule { }