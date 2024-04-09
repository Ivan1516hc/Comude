import { Injectable } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor {
  constructor(private _loading: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, request.url);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._loading.setLoading(false, request.url);
        }
        return event;
      }),
      finalize(() => {
        this._loading.setLoading(false, request.url);
      })
    );
  }
}
