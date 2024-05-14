import { Component, OnInit, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header.component.html'
})

export class HeaderComponentAdmin {
  @Input() urlLogo: string;
  constructor(private router: Router,@Inject(DOCUMENT) private document: Document, private authService:AuthService) { }

  ngOnInit(): void {
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logOut(){
    const token = localStorage.getItem('token');
    this.authService.logOut(token).subscribe({next:(response)=>{
      if(response.message){
        this.router.navigateByUrl('/auth/login')
      }
    }, error: (error)=>{

    }})
  }
}
