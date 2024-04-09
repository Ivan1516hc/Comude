import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
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
