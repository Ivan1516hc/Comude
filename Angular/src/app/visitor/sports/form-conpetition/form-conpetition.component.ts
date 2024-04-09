import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllVisitorService } from '../../services/all-visitor.service';
import Swal from 'sweetalert2';

interface budget {
  minimum_budget: number,
  maximum_budget: number
}

@Component({
  selector: 'app-form-conpetition',
  templateUrl: './form-conpetition.component.html',
  styleUrls: ['./form-conpetition.component.css']
})
export class FormConpetitionComponent {

  urlPrincipal: string;
  catalog: any
  debget: budget;
  newData: boolean = true;
  onlySee: boolean = false;
  edit: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute, private allService: AllVisitorService
  ) {
    
    this.miFormulario.get('competition_type_id')?.valueChanges.subscribe((id) => {
      if(this.newData || this.edit){
        this.select(id);
      }

    });

  }

  ngOnInit(): void {
    this.getDataCompetition();
    this.obtenerURLPrincipal();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.miFormulario.patchValue({
        request_id: id
      });
      if (id) {
        this.showConpetition(id);
      }
    });

    const numberFields = ['requested_budget'];

    numberFields.forEach(field => {
      this.subscribeToNumberFieldChanges(field);
    });
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



  select(id) {
    if (id == 1) {

      this.miFormulario.patchValue({
        'country_id': 120,
        'countries_state_id': 2632
      })
      this.debget = {
        minimum_budget: 500,
        maximum_budget: 2500
      }
      this.getDataCountryStates();

      this.validatorTypeCompetition(id);
    }
    else if (id == 2) {
      this.miFormulario.patchValue({
        'country_id': 120,
        'countries_state_id': null
      })

      this.debget = {
        minimum_budget: 5000,
        maximum_budget: 10000
      }

      this.getDataCountryStates();

      this.validatorTypeCompetition(id);
    } else {
      this.debget = {
        minimum_budget: 5000,
        maximum_budget: 20000
      }
      this.miFormulario.patchValue({
        'country_id': null,
        'countries_state_id': null
      })

      this.validatorTypeCompetition(id);
    }
  }


  validatorTypeCompetition(id) {
    if (id == 1) {
      this.miFormulario.get('country_id').disable()
      this.miFormulario.get('countries_state_id').disable()
      this.miFormulario.get('countries_state_id').setValidators(Validators.required);
      this.miFormulario.get('countries_state_id').updateValueAndValidity();
    }
    else if (id == 2) {
      this.miFormulario.get('country_id').disable()
      this.miFormulario.get('countries_state_id').enable()
      this.miFormulario.get('countries_state_id').setValidators(Validators.required);
      this.miFormulario.get('countries_state_id').updateValueAndValidity();
    } else {
      this.miFormulario.get('country_id').enable()
      this.miFormulario.get('countries_state_id').enable()
      this.miFormulario.get('countries_state_id').clearValidators();
      this.miFormulario.get('countries_state_id').updateValueAndValidity();
    }
  }

  obtenerURLPrincipal() {
    const urlCompleta = this.router.url;
    const segmentos = urlCompleta.split('/');
    this.urlPrincipal = '/' + segmentos[1];
  }

  getDataCompetition() {
    this.allService.getDataCompetition().subscribe({
      next: (response) => {
        this.catalog = response;
      }
    })
  }


  miFormulario: FormGroup = this.fb.group({
    request_id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    country_id: [{ value: '', disabled: true }, [Validators.required]],
    countries_state_id: ['', [Validators.required]],
    start_date: ['', [Validators.required]],
    ending_date: ['', [Validators.required]],
    classify: ['', [Validators.required]],
    justification: ['', [Validators.required]],
    requested_budget: ['', [Validators.required, Validators.min(500), Validators.max(20000)]],
    competition_type_id: ['', [Validators.required]],
  });


  showConpetition(id: any): void {
    this.allService.getCompetition(id).subscribe({
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
      name: response.name,
      country_id: response.country_id,
      countries_state_id: response.countries_state_id,
      start_date: response.start_date,
      ending_date: response.ending_date,
      classify: response.classify,
      justification: response.justification,
      requested_budget: response.requested_budget,
      competition_type_id: response.competition_type_id,
    });
    this.getDataCountryStates();
    this.miFormulario.disable();
  }


  handleForm(response: any): void {

  }

  getDataCountryStates() {
    this.allService.getDataCountryStates(this.miFormulario.controls['country_id'].value ?? 120).subscribe({
      next: (response) => {
        this.catalog.countries_state = response;
      }
    })
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
    const message = this.edit ? 'Información de la competición actualizada.' : 'Información de la competición guardada correctamente ¿desea continuar con la documentación?';
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
        this.router.navigateByUrl(this.urlPrincipal + '/solicitud/' + this.miFormulario.value.request_id + '/padres');
      } else if (result.isDenied) {
        this.router.navigateByUrl(this.urlPrincipal + '/beneficiario/' + response.beneficiary_id + '/' + this.miFormulario.value.request_id);
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