import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllVisitorService } from '../../services/all-visitor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-bank-account',
  templateUrl: './form-bank-account.component.html',
  styleUrls: ['./form-bank-account.component.css']
})
export class FormBankAccountComponent {

  request_id: number;
  urlPrincipal: string;
  catalog: any;
  newData: boolean = true;
  onlySee: boolean = false;
  edit: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute, private allService: AllVisitorService
  ) {

  }

  ngOnInit(): void {
    this.obtenerURLPrincipal();
    this.route.params.subscribe(params => {
      this.request_id = params['id'];
      if (this.request_id) {
        this.showAccountBank(this.request_id);
      }
    });

    const numberFields = ['account', 'key_account'];

    numberFields.forEach(field => {
      this.subscribeToNumberFieldChanges(field);
    });
  }

  private subscribeToNumberFieldChanges(fieldName: string): void {
    this.miFormulario.get(fieldName).valueChanges.subscribe(value => {
      const newValue = value.replace(/\D/g, ''); // Remueve todos los caracteres que no sean dígitos
      this.miFormulario.get(fieldName).setValue(newValue, { emitEvent: false }); // Actualiza el valor en el formulario
    });
  };

  obtenerURLPrincipal() {
    const urlCompleta = this.router.url;
    const segmentos = urlCompleta.split('/');
    this.urlPrincipal = '/' + segmentos[1];
  }

  miFormulario: FormGroup = this.fb.group({
    account: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(8), Validators.maxLength(18)]],
    key_account: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(18), Validators.maxLength(18)]],
    titular_persona_name: ['', [Validators.required]],
    bank: ['', [Validators.required]]
  });


  showAccountBank(id: any): void {
    this.allService.getBankAccount(id).subscribe({
      next: (response) => {
        if (response.id) {
          this.onlySee = true;
          this.newData = false;
          this.populateForm(response);
          this.handleForm(response);
        } else {

        }
      }
    });
  }

  populateForm(response: any): void {
    this.miFormulario.patchValue({
      account: response.account,
      key_account: response.key_account,
      titular_persona_name: response.titular_persona_name,
      bank: response.bank,
    });
    this.miFormulario.disable();
  }


  handleForm(response: any): void {

  }

  onSubmit() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }
    const data = this.miFormulario.getRawValue();
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

  handleSuccessResponse(response: any): void {
    this.newData = false;
    this.onlySee = true;
    this.miFormulario.disable();
    const message = this.edit ? 'Información bancaria actualizada.' : 'Información bancaria guardada correctamente ¿desea continuar con la documentación?';
    const swalOptions: any = {
      title: message,
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `No`,
    };
    if (this.edit) {
      swalOptions.position = 'center';
      swalOptions.icon = 'success';
      swalOptions.showConfirmButton = false;
      swalOptions.showCancelButton = false,
        swalOptions.timer = 2000;
    }
    Swal.fire(swalOptions).then((result) => {
      if (result.isConfirmed && !this.edit) {
        this.miFormulario.reset();
        this.router.navigateByUrl(this.urlPrincipal + '/solicitante/beca-deportiva/' + this.miFormulario.value.request_id + '/documentacion');
      } else if (result.isDenied) {
        this.router.navigateByUrl(this.urlPrincipal + '/solicitante/beca-deportiva/' + this.miFormulario.value.request_id + '/cuenta-bancaria');
      }
    });
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
