import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import Swal from "sweetalert2";

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    curp: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/),Validators.minLength(18), Validators.maxLength(18)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  procedure: string;
  center: string;
  room: string;
  emailReset: any;

  constructor(private fb: FormBuilder,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Bienvenido a la plataforma de Becas Deportivas del Consejo Municipal del Deporte de Zapopan.',
      text: '¿Cuentas ya con alguna cuenta?',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'SÍ',
      denyButtonText: 'NO',
    }).then((result) => {
      if (result.isConfirmed) {
        return;
      } else if (result.isDenied) {
        this.router.navigateByUrl('/auth/registrar')
      }
    })
  }

  login() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    const { curp, password } = this.miFormulario.value;
    this.authService.login(curp, password).
      subscribe(response => {
        if (response.ok === true) {
          this.router.navigateByUrl('/solicitante/dashboard')
        } else if (response.status == 400) {
          Swal.fire({
            title: 'Correo electrónico no verificado o la verificación expiró. ¿Quieres verificarlo?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Verificar',
            denyButtonText: `No verificar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.authService.resendVerificationEmail(response.email).subscribe({
                next: (response) => {
                  if (response.code == 200) {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: response.message,
                      showConfirmButton: true
                    })
                    this.router.navigateByUrl('/auth/verificar/' + response.email)
                  } else {
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: response.error.message,
                      showConfirmButton: true
                    })
                  }
                }, error: (error) => {
                  console.log(error);
                }
              });
            }
            else if (result.isDenied) {
              this.router.navigateByUrl('/auth/login')
            }
          })


        } else if (response?.error?.message) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response?.error?.message,
            showConfirmButton: true
          })
        }
      })
  }

  sendEmail() {
    this.authService.sendResetMenssage({ curp: this.emailReset }).subscribe({
      next: (response) => {
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: true
          })
          this.router.navigateByUrl('/auth/login')
        } else if (response.code == 401) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
        }
      }, error: (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

  isPasswordVisible = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
