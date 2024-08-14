import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html'
})
export class LoginAdminComponent {
  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(private fb: FormBuilder,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {

  }

  login() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    const { email, password } = this.miFormulario.value;
    this.authService.loginAdmin(email, password).
      subscribe(response => {
        if (response.ok === true) {
          this.router.navigateByUrl('/admin/dashboard')
        } else if (response?.error?.message) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response?.error?.message,
            showConfirmButton: true
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response?.message,
            showConfirmButton: true
          })
        }
      })
  }

  isPasswordVisible = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}