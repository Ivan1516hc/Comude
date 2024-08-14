import { Component } from '@angular/core';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent {

  opciones = [
    { icon: 'bi bi-speedometer', title: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'bi bi-file-break-fill', title: 'Solicitudes', route: '/admin/validaciones' },
    { icon: 'bi bi-file-check-fill', title: 'Para evaluación de Comite', route: '/admin/evaluaciones-comite' },
    { icon: 'bi bi-clock-history', title: 'Historico', route: '/admin/historico' },
    { icon: 'bi bi-people-fill', title: 'Beneficiarios', route: '/admin/beneficiarios' },
    { icon: 'bi bi-archive-fill', title: 'Catalogos', route: '/admin/catalogos' },
  ];
  urlLogo = '/admin/dashboard';
}
