import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layouts/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule, 
    FormsModule,
  ],
  providers: [ DatePipe ],
  exports: [SidebarComponent, HeaderComponent, FooterComponent]
})
export class SharedModule { }
