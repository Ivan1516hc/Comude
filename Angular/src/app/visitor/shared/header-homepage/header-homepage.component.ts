import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header-homepage',
  templateUrl: './header-homepage.component.html',
  styleUrls: ['./header-homepage.component.css']
})
export class HeaderHomepageComponent {
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
