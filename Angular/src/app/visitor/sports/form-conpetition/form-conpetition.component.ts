import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CompetitionsService } from '../../services/competitions.service';
import { RequestsService } from '../../services/requests.service';

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
  form_id: number = 1;
  urlPrincipal: string;
  catalog: any
  debget: budget = {
    minimum_budget: 0,
    maximum_budget: 0
  };
  newData: boolean = true;
  onlySee: boolean = false;
  edit: boolean = false;
  previousStartDate: string;
  request: any;
  modify: any = [];


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute, private competitionService: CompetitionsService,
    private requestService: RequestsService
  ) {
    this.miFormulario.get('competition_type_id')?.valueChanges.subscribe((id) => {
      if (this.newData || this.edit) {
        this.select(id);
      }
    });

    this.getDataCompetition();
    this.obtenerURLPrincipal();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.miFormulario.patchValue({
        request_id: id
      });
      if (id) {
        this.showConpetition(id);
        this.requestService.show(id).subscribe({
          next: (response) => {
            this.request = response;
          }
        });
      }
    });
    
  }

  // Obtener la fecha actual en formato ISO (por ejemplo, "2023-09-15")
  currentDate = new Date().toISOString().split('T')[0];

  // Función para calcular la fecha mínima permitida (día siguiente a la fecha actual)
  minDate() {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate()); // Obtener el día siguiente
    return tomorrow.toISOString().split('T')[0];
  }

  // Método para obtener la fecha mínima permitida para la fecha de finalización
  minEndingDate(): string {
    const startDate = this.miFormulario.get('start_date').value;
    return startDate ? startDate : '';
  }

  // Método para detectar cambios en la fecha de inicio
  onStartDateChange(): void {
    const startDate = this.miFormulario.get('start_date').value;
    // Verificar si la fecha de inicio ha cambiado y si la fecha de finalización ya estaba establecida y es menor que la nueva fecha de inicio
    if (startDate !== this.previousStartDate && this.miFormulario.get('ending_date').value < startDate) {
      // Borrar la fecha de finalización si es menor que la nueva fecha de inicio
      this.miFormulario.get('ending_date').setValue('');
    }
    // Actualizar el valor anterior de la fecha de inicio
    this.previousStartDate = startDate;
  }

  ngOnInit(): void {

    const numberFields = ['requested_budget'];
    numberFields.forEach(field => {
      this.subscribeToNumberFieldChanges(field);
    });

    // Guardar el valor inicial de la fecha de inicio
    this.previousStartDate = this.miFormulario.get('start_date').value;

    this.requestService.verifyRequest(this.miFormulario.value.request_id, this.form_id).subscribe({
      next: (res) => {
        this.modify = res;
        if (this.modify.length > 0) {
          this.loadingUpdate();
        }
      }
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
        'countries_state_id': 15
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
        'countries_state_id': this.miFormulario.value.countries_state_id ?? null
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
        'country_id': this.miFormulario.value.country_id ?? null,
        'countries_state_id': null
      })
      this.validatorTypeCompetition(id);
    }
    this.miFormulario.get('requested_budget').setValidators([Validators.required, Validators.max(this.debget?.maximum_budget)]);
    this.miFormulario.get('requested_budget').updateValueAndValidity();
  }

  toggleAlert() {
    var alert = document.getElementById("alert");
    if (alert.style.display === "none") {
      alert.style.display = "block";
    } else {
      alert.style.display = "none";
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
    this.competitionService.getDataCompetition().subscribe({
      next: (response) => {
        this.catalog = response;
      }
    })
  }

  miFormulario: FormGroup = this.fb.group({
    request_id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    country_id: [{ value: '', disabled: true }, [Validators.required]],
    countries_state_id: [null, [Validators.required]],
    start_date: ['', [Validators.required]],
    ending_date: ['', [Validators.required]],
    classify: ['', [Validators.nullValidator]],
    justification: ['', [Validators.required]],
    requested_budget: ['', [Validators.required, Validators.max(this.debget?.maximum_budget)]],
    competition_type_id: ['', [Validators.required]],
  });
  showConpetition(id: any): void {
    this.competitionService.show(id).subscribe({
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
    this.competitionService.getDataCountryStates(this.miFormulario.controls['country_id'].value ?? 120).subscribe({
      next: (response) => {
        this.catalog.countries_state = response;
      }
    })
  }

  onSubmit() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }

    if (this.miFormulario.get('start_date').value > this.miFormulario.get('ending_date').value) {
      return Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'La fecha de inicio no puede ser mayor a la fecha de finalización',
        showConfirmButton: true,
        timer: 2000
      });
    }

    this.edit ? this.update() : this.store();
  }

  store() {
    const data = this.miFormulario.getRawValue();
    this.competitionService.store(data).subscribe({
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

  update() {
    const data = this.miFormulario.getRawValue();
    this.competitionService.update(data).subscribe({
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
    const message = this.edit ? 'Información de la competencia actualizada.' : 'Competencia registrada correctamente. ¿Deseas continuar con el registro de cuenta bancaria donde se depositará el apoyo?';
    const swalOptions: any = {
      title: message,
      icon: 'info',
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
        this.miFormulario.disable();
        this.router.navigateByUrl(this.urlPrincipal + '/beca-deportiva/' + this.miFormulario.value.request_id + '/cuenta-bancaria');
      } else if (result.isDenied) {
        this.ngOnInit();
      }
    });
    if (this.edit) {
      this.ngOnInit();
      this.edit = false;
    }
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

  loadingUpdate(): void {
    this.edit = true;
    this.onlySee = false;
    this.miFormulario.enable();
  }
}