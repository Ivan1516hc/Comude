import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  miFormulario: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
  });

  curp: string;
  token: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.curp = params['email'];
      this.token = params['token'];
    });
  }

  reset() {
    let data = this.miFormulario.value;
    data['curp'] = this.curp;
    data['token'] = this.token;
    this.authService.resetPassword(data, this.token).subscribe({
      next: (response) => {
        if (response.message && response.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: true,
            didClose: () => {
              this.router.navigateByUrl('/auth/login');
            }
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.error,
            showConfirmButton: true
          })
        }
      }, error: (error) => {
        if (error.status === 422) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          Swal.fire("Error", "error");
        }
      }
    });
  }
}
