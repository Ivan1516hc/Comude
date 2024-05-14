import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SidebarComponentAdmin } from './layouts/sidebar/sidebar.component';
import { HeaderComponentAdmin } from './layouts/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponentAdmin } from './layouts/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MexicanCurrencyPipe } from 'src/app/pipes/mexican-currency.pipe';

@NgModule({
  declarations: [
    SidebarComponentAdmin,
    HeaderComponentAdmin,
    FooterComponentAdmin,
    MexicanCurrencyPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatePipe],
  exports: [SidebarComponentAdmin, HeaderComponentAdmin, FooterComponentAdmin, MexicanCurrencyPipe]
})
export class SharedModule { }
