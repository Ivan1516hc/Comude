import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllVisitorService } from '../../services/all-visitor.service';

@Component({
  selector: 'app-form-bank-account',
  templateUrl: './form-bank-account.component.html',
  styleUrls: ['./form-bank-account.component.css']
})
export class FormBankAccountComponent {

  request_id: number;
  urlPrincipal: string;
  catalog: any

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

  }

  onSubmit() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }
    const data = this.miFormulario.getRawValue();

    console.log(data);
  }
}
