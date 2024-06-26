import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadersInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers=new HttpHeaders({
       // 'Content-Type':'application/json',
       'Content-Security-Policy': "default-src 'self' https://app4.comudezapopan.gob.mx",
        'Authorization':'Bearer '+localStorage.getItem('token')||''
    });

    const reqClone =req.clone({
      headers
    });
    return next.handle(reqClone)
  }
}
