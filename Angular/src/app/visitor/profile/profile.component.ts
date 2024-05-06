import { Component, ElementRef, ViewChild } from '@angular/core';
import { AllVisitorService } from '../services/all-visitor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // Obtener el botón por su ID o cualquier otro selector
  @ViewChild('myButton') myButton: ElementRef;

  constructor(
    // private router: Router,
    private fb: FormBuilder,
    // private route: ActivatedRoute, 
    private allService: AllVisitorService
  ) {
  }

  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    mother_last_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    second_phone_number: ['', [Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    curp: [{ value: '', disabled: true }, [Validators.required]],
    rfc: ['', [Validators.minLength(13), Validators.maxLength(13)]],
    birtdate: ['', [Validators.required]],
  });

  miFormularioPassword: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    new_password: ['', [Validators.required, Validators.minLength(6)]],
    new_password_repeat: ['', [Validators.required]]
  }, {
    validators: this.passwordsMatchValidator
  });
  // Método para validar si las contraseñas coinciden
  passwordsMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('new_password').value;
    const newPasswordRepeat = formGroup.get('new_password_repeat').value;

    // Si las contraseñas no coinciden, establecer un error en el control de new_password_repeat
    if (newPassword !== newPasswordRepeat) {
      formGroup.get('new_password_repeat').setErrors({ passwordsMismatch: true });
    } else {
      // Si coinciden, borrar cualquier error que pueda haber
      formGroup.get('new_password_repeat').setErrors(null);
    }
  }

  private subscribeToNumberFieldChanges(fieldName: string): void {
    this.miFormulario.get(fieldName).valueChanges.subscribe(value => {
      if (!isNaN(parseFloat(value)) && isFinite(value)) {
        // El valor es un número, mantener el valor actual
        return;
      }
      const newValue = value.replace(/\D/g, ''); // Remueve todos los caracteres que no sean dígitos
      this.miFormulario.get(fieldName).setValue(newValue, { emitEvent: false }); // Actualiza el valor en el formulario
    });
  };

  ngOnInit(): void {
    this.getDataUser();

    const numberFields = ['phone_number', 'second_phone_number'];

    numberFields.forEach(field => {
      this.subscribeToNumberFieldChanges(field);
    });
  }

  getDataUser() {
    this.allService.getInfo().subscribe({
      next: (response) => {
        this.populateForm(response);
      }
    })
  }

  populateForm(response: any): void {
    const nameParts = response.name.split(' ');
    const motherLastName = nameParts.pop();
    const lastName = nameParts.pop();
    const name = nameParts.join(' ');

    this.miFormulario.patchValue({
      name: name,
      last_name: lastName,
      mother_last_name: motherLastName,
      email: response.email,
      password: response.password,
      phone_number: response.phone_number,
      curp: response.curp,
      rfc: response.rfc,
      birtdate: response.birtdate,
      second_phone_number: response.second_phone_number
    });

    if (!response.name || !response.phone_number || !response.birtdate) {
      this.myButton.nativeElement.click();
    }
  }

  handleForm(response: any): void {

  }

  onSubmit() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }
    this.miFormulario.patchValue({
      'name': this.miFormulario.get('name').value + ' ' + this.miFormulario.get('last_name').value + ' ' + this.miFormulario.get('mother_last_name').value,
    });

    const data = this.miFormulario.getRawValue();

    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea actualizar su información de perfil?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.allService.updateInfo(data).subscribe(response => {
          if (response.code == 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 2000
            });
            this.getDataUser();
          } else {
            Swal.fire("Error", "error")
          }
        })
      } else if (result.isDenied) {
        return;
      }
    })
  }

  changePassword() {
    if (this.miFormularioPassword.invalid) {
      return this.miFormularioPassword.markAllAsTouched();
    }
    const data = this.miFormularioPassword.getRawValue();

    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea actualizar su contraseña?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.allService.changePassword(data).subscribe({
          next: (response) => {
            if (response.code == 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
              });
              this.getDataUser();
              this.miFormularioPassword.reset();
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
        });
      } else {
        return;
      }
    })
  }

  handleSuccessResponse(accion): void {
    this.getDataUser();
    const message = '';
    const swalOptions: any = {
      title: message,
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `No`,
    };
    swalOptions.position = 'center';
    swalOptions.icon = 'success';
    swalOptions.showConfirmButton = false;
    swalOptions.showCancelButton = false,
      swalOptions.timer = 2000;

  }

  handleErrorResponse(response: any): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: response.message,
      showConfirmButton: false,
      timer: 2000
    });
  }
}