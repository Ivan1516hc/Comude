import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent {
  
  constructor(private router: Router,private route: ActivatedRoute,private authService:AuthService){

  }
  email:any;
  ngOnInit() {
    this.getParams();
  }

  inputValues: string[] = ['', '', '', '', ''];

  moveToNextInput(nextIndex: number) {
    const nextInput = document.getElementsByClassName('verification-input')[nextIndex] as HTMLInputElement;
    nextInput.focus();
  }
  getParams() {
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }

  resendEmailVerify(){
    this.authService.sendResetMenssage({email: this.email}).subscribe({next:(response)=>{
      if(response.code == 200){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigateByUrl('/auth/login')
      } else if (response.code == 401){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: response.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    },error: (error)=>{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 2000
      })
    }})
  }

  submitForm(){
    const concatenatedValues = this.inputValues.join('');
    this.authService.verificationEmail({token: concatenatedValues},this.email).subscribe({next:(response)=>{
      if(response.code == 200){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.message,
        })
        this.router.navigateByUrl('/auth/login');
      } else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: response.error.message,
          showConfirmButton: true
        })
        this.clearInputs();
      }
    },error: (error)=>{
      console.log(error)
      if (error.status == 404) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 2000
        })
        this.clearInputs();
      } else {
        Swal.fire("Error", "error");
        this.clearInputs();
      }
    }})
  }

  clearInputs() {
    this.inputValues = ['', '', '', '', '']; // Restablecer los valores a vacío
  }
}
