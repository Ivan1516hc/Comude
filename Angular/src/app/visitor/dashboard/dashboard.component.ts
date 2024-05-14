import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataRequest, Datum } from '../interfaces/request-aplicant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private requestService: RequestsService) {
  }
  catalog: any;
  requests: DataRequest;
  readRegulation: boolean = false;
  competition: number;
  hasBankAccount: boolean = false;
  hasImportantArchievements: boolean = false;
  currentUrl = window.location.pathname;

  miFormulario: FormGroup = this.fb.group({
    modality: ['', [Validators.required]],
    discipline_id: ['', [Validators.required]]
  });

  miFormularioRegulations: FormGroup = this.fb.group({
    read_regulation: ['', [Validators.required, Validators.requiredTrue]]
  });

  isCompetitionOver(endingDate: any): boolean {
    const competitionEndDate = new Date(endingDate);
    const currentDate = new Date();
    return competitionEndDate >= currentDate;
  }

  ngOnInit(): void {
    this.requestService.getDataDiscipline().subscribe({
      next: (response) => {
        this.catalog = response;
      }
    })

    this.requestService.getAll().subscribe({
      next: (response) => {
        if (response.code == 200 || response.code == 404) {
          this.requests = response.data ?? null;
          this.hasBankAccount = response.hasBankAccount ?? null;
          this.readRegulation = response.readRegulations ?? false;
          this.hasImportantArchievements = response.hasImportantArchievements ?? false;
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    })
    this.currentUrl = window.location.pathname;
  }

  needImportantArchievement() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Necesitas registrar al menos un logro deportivo importante ¿desea registrar un logro?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        // Obtener la ruta relativa deseada ('../perfil')
        const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/perfil';
        // Navegar a la ruta relativa
        this.router.navigateByUrl(relativeUrl);
      } else if (result.isDenied) {
        return
      }
    })
  }

  storeRequest() {
    const data = this.miFormulario.value;
    this.requestService.store(data).subscribe({
      next: (response) => {
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
              const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/perfil';
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
          const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + response.request_id + '/competicion';
          this.router.navigateByUrl(relativeUrl);
        }
      }, error: (err) => {

      }
    })
  }

  readRegulations(): any {
    if (this.miFormularioRegulations.invalid) {
      return Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Debes aceptar el reglamento para continuar.',
        showConfirmButton: false,
        timer: 2000
      })
    }
    this.requestService.readRegulations().subscribe({
      next: (response) => {
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
          this.readRegulation = true;
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    })
  }

  updateStatus(id, status_request_id) {

  }

  continuar(request: Datum): any {
    if (request.finished) {
      return
    }
    if (!request.competition) {
      const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + request.id + '/competicion';
      return this.router.navigateByUrl(relativeUrl);
    }
    if (!this.hasBankAccount) {
      const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + request.id + '/cuenta-bancaria';
      return this.router.navigateByUrl(relativeUrl);
    }
    if (request.documents_count < 6) {
      const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + request.id + '/documentacion';
      return this.router.navigateByUrl(relativeUrl);
    }
    if (request.status_request_id == 1) {
      const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + request.id + '/reglamento';
      return this.router.navigateByUrl(relativeUrl);
    }
  }
}