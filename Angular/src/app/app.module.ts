import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeadersInterceptorService } from './interceptors/headers-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxExtendedPdfViewerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  [{ provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }, { provide: LOCALE_ID, useValue: 'es' }]],
  bootstrap: [AppComponent]
})
export class AppModule { }