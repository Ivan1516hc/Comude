import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tramites';
  loading:boolean;
  constructor(private elementRef: ElementRef,  public  _router: Router, private _loading: LoaderService) { 
    
  }

  ngOnInit() {
    this.listenToLoading();
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
