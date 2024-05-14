import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer.component.html'
})
export class FooterComponentAdmin {
  constructor() { }

  ngOnInit(): void {
  }
  scrollTop()
  {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });

  }
}
