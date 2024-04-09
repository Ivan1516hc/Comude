import { Component } from '@angular/core';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent {

  opciones = [
    { icon: 'bi bi-grid', title: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'bi bi-file-earmark-zip', title: 'Solicitudes', route: '/admin/solicitudes' },
    { icon: 'bi bi-person-fill', title: 'Beneficiarios', route: '/admin/beneficiarios' },
  ];
  urlLogo = '/admin/dashboard';

}
