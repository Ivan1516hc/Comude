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
    email: ['', [Validators.required]],
    phone_number: ['', [Validators.required]],
    curp: [{ value: '', disabled: true }, [Validators.required]],
    rfc: ['', [Validators.required]],
    birtdate: ['', [Validators.required]],
  });

  miFormularioPassword: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
    new_password: ['', [Validators.required]],
    new_password_repeat: ['', [Validators.required]]
  });

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

    const numberFields = ['phone_number'];

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
    this.miFormulario.patchValue({
      name: response.name,
      email: response.email,
      password: response.password,
      phone_number: response.phone_number,
      curp: response.curp,
      rfc: response.rfc,
      birtdate: response.birtdate
    });

    if (!response.name || !response.phone_number || !response.rfc || !response.birtdate) {
      this.myButton.nativeElement.click();
    }
  }

  handleForm(response: any): void {

  }

  

  onSubmit() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }
    const data = this.miFormulario.getRawValue();

    this.allService.updateInfo(data).subscribe({
      next: (response) => {
        if (response.code == 200) {
          this.handleSuccessResponse(response);
        } else {
          this.handleErrorResponse(response);
        }
      }, error: (err) => {
        Swal.fire("Error", "error")
      }
    });
  }

  changePassword() {
    if (this.miFormularioPassword.invalid) {
      return this.miFormularioPassword.markAllAsTouched();
    }
    const data = this.miFormularioPassword.getRawValue();

    this.allService.storeCompetition(data).subscribe({
      next: (response) => {
        if (response.code == 200) {
          this.handleSuccessResponse(response);
        } else {
          this.handleErrorResponse(response);
        }
      }, error: (err) => {
        Swal.fire("Error", "error")
      }
    });
  }

  handleSuccessResponse(accion): void {
    this.miFormulario.disable();
    const message = accion ? 'Información de la competición actualizada.' : 'Información de la competición guardada correctamente ¿desea continuar con la documentación?';
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