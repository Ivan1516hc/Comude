import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    curp: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
  });
  

  constructor(private fb: FormBuilder,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    let data = this.miFormulario.value;
    this.authService.register(data).subscribe({
      next: (response) => {
        if(response.code == 200){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: true
          })
          this.router.navigateByUrl('/auth/verificar/'+data.email)
        } else if(response.code == 409){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.message,
            showConfirmButton: true
          })
        }
      }, error: (error)=>{
        Swal.fire("Error", "error");
      }
    });
  }
}
