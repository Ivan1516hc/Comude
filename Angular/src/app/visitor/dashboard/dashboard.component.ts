import { Component, OnInit } from '@angular/core';
import { AllVisitorService } from '../services/all-visitor.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private visitorService: AllVisitorService) {
  }


  ngOnInit(): void {
    this.visitorService.getDataDiscipline().subscribe({
      next: (response) => {
        this.catalog = response;
      }
    })
  }
  catalog: any;

  competition: number;
  discipline: number;

  storeRequest() {
    const data = { 'discipline_id': this.discipline }
    this.visitorService.storeRequest(data).subscribe({
      next: (response) => {
        // Obtener la ruta actual
        const currentUrl = window.location.pathname;
        if (response.code == 201) {
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: response.message + '¿desea completar la información de su perfil?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: `No`
          }).then((result) => {
            if (result.isConfirmed) {
              // Obtener la ruta relativa deseada ('../perfil')
              const relativeUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/')) + '/solicitante/perfil';
              // Navegar a la ruta relativa
              this.router.navigateByUrl(relativeUrl);
            } else if (result.isDenied) {
              return
            }
          })
        }
        if (response.code == 202) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
        }
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
          // Obtener la ruta relativa deseada ('../perfil')
          const relativeUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + response.request_id + '/competicion';
          this.router.navigateByUrl(relativeUrl);
        }
      }, error: (err) => {

      }
    })
  }

}