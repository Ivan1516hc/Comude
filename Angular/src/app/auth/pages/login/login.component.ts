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
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  procedure: string;
  center: string;
  room: string;
  emailReset: any;

  constructor(private fb: FormBuilder,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {

  }

  login() {
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password).
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
              this.authService.resendVerificationEmail(email).subscribe({
                next: (response) => {
                  if (response.code == 200) {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: response.message,
                      showConfirmButton: true
                    })
                    this.router.navigateByUrl('/auth/verificar/' + email)
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
    this.authService.sendResetMenssage({ email: this.emailReset }).subscribe({
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
}
