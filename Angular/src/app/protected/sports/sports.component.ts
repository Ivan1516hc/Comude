import { Component } from '@angular/core';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent {

  opciones = [
    { icon: 'bi bi-speedometer', title: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'bi bi-file-break-fill', title: 'Validaciones', route: '/admin/validaciones' },
    { icon: 'bi bi-file-check-fill', title: 'Evaluaciones Comite', route: '/admin/evaluaciones-comite' },
    { icon: 'bi bi-people-fill', title: 'Beneficiarios', route: '/admin/beneficiarios' },
  ];
  urlLogo = '/admin/dashboard';
}
