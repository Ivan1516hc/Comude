import { Component, Input } from '@angular/core';

export interface OpcionSidebar {
  icon: string,
  route: string;
  title: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent {
  @Input() opcionesSidebar: OpcionSidebar[];
  @Input() urlLogo: string;
  active: boolean = true; // Puedes inicializarlo según tus necesidades
  constructor() {
    this.opcionesSidebar = [];
    this.urlLogo='';
    // Opcionalmente, puedes inicializarla con un valor vacío
  }
}
