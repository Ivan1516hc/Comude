import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { BankAccountsService } from '../../services/bank-accounts.service';

@Component({
  selector: 'app-form-bank-account',
  templateUrl: './form-bank-account.component.html',
  styleUrls: ['./form-bank-account.component.css']
})
export class FormBankAccountComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFileName: string | null = null;
  selectedFilePreview: string | null = null;
  request_id: number;
  urlPrincipal: string;
  catalog: any;
  newData: boolean = true;
  onlySee: boolean = false;
  edit: boolean = false;
  baseUrl = environment.dowload;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bankAccountService: BankAccountsService
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
    request_id: ['', [Validators.required]],
    account: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(8), Validators.maxLength(18)]],
    key_account: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(18), Validators.maxLength(18)]],
    titular_persona_name: ['', [Validators.required]],
    bank: ['', [Validators.required]],
    account_status_url: ['', [Validators.required]]
  });


  showAccountBank(id: any): void {
    this.miFormulario.patchValue({
      request_id: id
    });
    this.bankAccountService.getBankAccount(id).subscribe({
      next: (response) => {
        if (response.id) {
          this.onlySee = true;
          this.newData = false;
          this.populateForm(response);
          this.handleForm(response);
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
      account_status_url: response.account_status_url
    });
    this.miFormulario.disable();
  }


  handleForm(response: any): void {

  }

  onSubmit() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }

    const formData = new FormData();
    formData.append('request_id', this.miFormulario.get('request_id').value);
    formData.append('account', this.miFormulario.get('account').value);
    formData.append('key_account', this.miFormulario.get('key_account').value);
    formData.append('titular_persona_name', this.miFormulario.get('titular_persona_name').value);
    formData.append('bank', this.miFormulario.get('bank').value);
    formData.append('account_status_url', this.miFormulario.get('account_status_url').value);

    this.bankAccountService.storeBankAccount(formData).subscribe({
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
    const message = this.edit ? 'Información bancaria actualizada.' : 'Información bancaria guardada correctamente ¿desea continuar?';
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
        this.ngOnInit();
        this.router.navigateByUrl(this.urlPrincipal + '/beca-deportiva/' + this.miFormulario.value.request_id + '/logros-importantes');
      } else  {
        this.ngOnInit();
      }
    });
  }

  handleErrorResponse(response: any): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: response.message,
      showConfirmButton: true
    });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = (event.dataTransfer?.files || []) as FileList;
    this.onFileSelected({ target: { files } });
  }

  onFileSelected(event: any): void {
    const files = event.target.files || event.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];

      this.miFormulario.patchValue({ account_status_url: file });

      this.selectedFileName = file.name;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFilePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.selectedFilePreview = null;
      }
    }
  }
}