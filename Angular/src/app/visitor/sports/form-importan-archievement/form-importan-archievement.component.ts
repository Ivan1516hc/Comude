import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-importan-archievement',
  templateUrl: './form-importan-archievement.component.html',
  styleUrls: ['./form-importan-archievement.component.css']
})
export class FormImportanArchievementComponent {
  request_id: number;
  urlPrincipal: string;
  
  constructor( private router: Router,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.obtenerURLPrincipal();
    this.route.params.subscribe(params => {
      this.request_id = params['id'];
    });
  }

  obtenerURLPrincipal() {
    const urlCompleta = this.router.url;
    const segmentos = urlCompleta.split('/');
    this.urlPrincipal = '/' + segmentos[1];
  }
}