import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataRequest, Datum, RequestsResponse } from '../interfaces/request-aplicant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../services/requests.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private requestService: RequestsService) {
  }
  catalog: any;
  requests: DataRequest;
  readRegulation: boolean = false;
  competition: number;
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
      title: 'Has leído el Reglamento, deberás actualizar la información de tu perfil y registrar al menos un logro deportivo para poder continuar.  ¿Deseas continuar con tu solicitud?',
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
            timer: 2000,
            didClose: () => {
              // Obtener la ruta relativa deseada ('../perfil')
              const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + response.request_id + '/competicion';
              this.router.navigateByUrl(relativeUrl);
            }
          })
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
          this.needImportantArchievement();
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
    this.requestService.changeStatusRequest({ 'request_id': id, 'status_request_id': status_request_id }).subscribe({
      next: (response) => {
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: true
          })

          this.ngOnInit();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  continuar(request: Datum): any {
    // console.log(request)
    if (request.finished) {
      return
    }
    if (!request.competition || request.competition_id == null) {
      return this.routes(1, request.id)
    }
    if (!request.bank_account || request.bank_account_id == null) {
      return this.routes(2, request.id)
    }
    if (request.documents_count < 6) {
      return this.routes(3, request.id)
    }
    if (request.status_request_id == 1) {
      return this.routes(7, request.id)
    }
    alert('No se puede continuar con la solicitud')
  }

  redirectTo(data, request_id) {
    this.routes(data.form.id, request_id)
  }

  routes(form, request_id): any {
    if (form == 1) {
      const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + request_id + '/competicion';
      return this.router.navigateByUrl(relativeUrl);
    }
    if (form == 2) {
      const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + request_id + '/cuenta-bancaria';
      return this.router.navigateByUrl(relativeUrl);
    }
    if (form == 3) {
      const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + request_id + '/documentacion';
      return this.router.navigateByUrl(relativeUrl);
    }
    if (form == 7) {
      const relativeUrl = this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')) + '/solicitante/beca-deportiva/' + request_id + '/reglamento';
      return this.router.navigateByUrl(relativeUrl);
    }
  }

  onPageChange(url:string) {
    const res = this.http.get<RequestsResponse>(url);
    res.subscribe({
      next: (response) => {
        this.requests = response.data  ?? null;
      }
    })
  }
}