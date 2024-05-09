import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllVisitorService } from '../../services/all-visitor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-notice-privacy',
  templateUrl: './form-notice-privacy.component.html',
  styleUrls: ['./form-notice-privacy.component.css']
})
export class FormNoticePrivacyComponent {
  request_id: number;
  urlPrincipal: string;
  request: any;


  constructor(private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute, private allService: AllVisitorService
  ) { }

  miFormulario: FormGroup = this.fb.group({
    // Agrega aquí los otros campos de tu formulario reactivo
    request_id: ['', Validators.required], // Ejemplo de campo requerido
    regulations: [null, [Validators.required, Validators.requiredTrue]], // Campo de archivo requerido
    privacy_notice: [null, [Validators.required, Validators.requiredTrue]],
    status_request_id: [2]
  });

  ngOnInit(): void {
    this.obtenerURLPrincipal();
    this.route.params.subscribe(params => {
      this.request_id = params['id'];
      if (this.request_id) {
        this.miFormulario.patchValue({
          'request_id': this.request_id
        })

        this.showRequest();
      }
    });
  }

  showRequest() {
    this.allService.showRequest(this.request_id).subscribe({
      next: (response) => {
        this.request = response;
      }
    })
  }

  obtenerURLPrincipal() {
    const urlCompleta = this.router.url;
    const segmentos = urlCompleta.split('/');
    this.urlPrincipal = '/' + segmentos[1];
  }

  onSubmit() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }

    this.allService.changeStatusRequest(this.miFormulario.value).subscribe({
      next: (response) => {
        if (response.code == 200) {
          this.ngOnInit();
          this.handleSuccessResponse();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          });
        }
      }, error: (err) => {
        Swal.fire("Error", "error")
      }
    })
  }

  handleSuccessResponse(): void {
    const message = 'Solicitud enviada correctamente, los administradores del trámite revisarán tu solicitud. Las actualizaciones importantes del estado de la solicitud llegarán al correo registrado.';
    // Muestra el modal y redirige después de cerrar
    // Muestra el modal y redirige después de cerrar
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: true,
      didClose: () => {
        this.router.navigateByUrl(this.urlPrincipal + '/dashboard');
      }
    });
  }

}