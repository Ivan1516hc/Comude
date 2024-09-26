import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SidebarComponentAdmin } from './layouts/sidebar/sidebar.component';
import { HeaderComponentAdmin } from './layouts/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponentAdmin } from './layouts/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MexicanCurrencyPipe } from 'src/app/pipes/mexican-currency.pipe';
import { SendingMessagesComponent } from './sending-messages/sending-messages.component';
import { ShowDataComponent } from './show-data/show-data.component';

@NgModule({
  declarations: [
    SidebarComponentAdmin,
    HeaderComponentAdmin,
    FooterComponentAdmin,
    MexicanCurrencyPipe,
    SendingMessagesComponent,
    ShowDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatePipe],
  exports: [ShowDataComponent, SidebarComponentAdmin, HeaderComponentAdmin, FooterComponentAdmin, MexicanCurrencyPipe]
})
export class SharedModule { }
