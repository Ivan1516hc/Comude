import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CrecheService } from '../../services/creche.service';
import { ActivatedRoute } from '@angular/router';
import { AllVisitorService } from '../../services/all-visitor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-parents',
  templateUrl: './form-parents.component.html',
  styleUrls: ['./form-parents.component.css']
})
export class FormParentsComponent {

  constructor(private fb: FormBuilder, private crecheService: CrecheService, private route: ActivatedRoute, private allVisitorService: AllVisitorService) {
    this.miFormulario.get('colonia')?.valueChanges.subscribe((selectedColoniaId) => {
      // Verificar que suburb esté definido y no sea null
      if (this.suburbs && this.suburbs.length > 0) {
        const selectedColonia = this.suburbs.find(suburb => suburb.id == selectedColoniaId);
        // Verificar que selectedColonia esté definido y no sea null
        console.log(selectedColonia.colonia);
        if (selectedColonia) {
          this.miFormulario.patchValue({
            colonia_name: selectedColonia.colonia
          });
          console.log(this.miFormulario.value.colonia_name);
        }
      }
    });

    this.miFormulario.get('colonia_trabajo')?.valueChanges.subscribe((selectedColoniaId) => {
      // Verificar que suburb esté definido y no sea null
      if (this.suburbsJob && this.suburbsJob.length > 0) {
        const selectedColonia = this.suburbsJob.find(suburb => suburb.id == selectedColoniaId);
        // Verificar que selectedColonia esté definido y no sea null
        if (selectedColonia) {
          this.miFormulario.patchValue({
            colonia_name_trabajo: selectedColonia.colonia
          });
        }
      }
    });
  }

  miFormularioParents: FormGroup = this.fb.group({
    parents: new FormArray([]),
  });

  

  get parents(): FormArray {
    return this.miFormularioParents.get('parents') as FormArray;
  };

  getParentFormGroup(index: number): FormGroup {
    return this.parents.at(index) as FormGroup;
  }

  shouldShowWorkDetails(index: number): boolean {
    const trabajaValue = this.getParentFormGroup(index).get('trabaja').value;
    return trabajaValue === 1;
  }

  shouldShowExtraWork(index: number): boolean {
    const trabajaExtraValue = this.getParentFormGroup(index).get('otro_trabajo').value;
    return trabajaExtraValue === 'SI';
  }

  defaultIfNullOrZero(value: any, defaultValue: any): any {
    return value === null || value === undefined || value === 0 ? defaultValue : value;
  }

  addParent(data: any) {
    
    const nuevoFormGroup = this.fb.group({
      curp: [data?.curp],
      nombre: [data?.nombre],
      apaterno: [data?.apaterno],
      amaterno: [data?.amaterno],
      fechanacimiento: [data?.fechanacimiento],
      edad: [data?.edad],
      escolaridad: [data?.escolaridad],
      calle: [data?.address[0]?.calle],
      numext: [data?.address[0]?.numext],
      numint: [data?.address[0]?.numint],
      primercruce: [data?.address[0]?.primercruce],
      segundocruce: [data?.address[0]?.segundocruce],
      codigopostal: [data?.address[0]?.codigopostal],
      estado: [data?.address[0]?.estado],
      municipio: [data?.address[0]?.municipio],
      colonia: [data?.address[0]?.colonia_name],
      vivienda: [data?.address[0]?.vivienda],
      sexo: [data?.sexo],
      tipo_sangre: [data?.tipo_sangre],
      lenguamaterna: [data?.lenguamaterna],
      serviciosmedicos: [data?.serviciosmedicos],
      celular: [data?.address[0]?.celular],

      ocupacion: [data.economic[0]?.ocupacion ?? ''],
      parentesco: [data.economic[0]?.parentesco ?? ''],
      lugar_nacimiento: [data.economic[0]?.lugar_nacimiento ?? ''],
      estado_civil: [data.economic[0]?.estado_civil ?? ''],
      estado_religioso: [data.economic[0]?.estado_religioso ?? ''],
      trabaja: [data.economic[0]?.trabaja ?? ''],
      lugar_trabajo: [data.economic[0]?.lugar_trabajo ?? ''],
      calle_trabajo: [data.economic[0]?.calle_trabajo ?? ''],
      telefono_trabajo: [data.economic[0]?.telefono_trabajo ?? ''],
      jefe_inmediato: [data.economic[0]?.jefe_inmediato ?? ''],
      codigo_trabajo: [data.economic[0]?.codigo_trabajo ?? ''],
      colonia_trabajo: [data.economic[0]?.colonia_name_trabajo ?? ''],
      municipio_trabajo: [data.economic[0]?.municipio_trabajo ?? ''],
      entrada_trabajo: [data.economic[0]?.entrada_trabajo ?? ''],
      salida_trabajo: [data.economic[0]?.salida_trabajo ?? ''],
      puesto: [data.economic[0]?.puesto ?? ''],
      antiguedad: [data.economic[0]?.antiguedad ?? ''],
      numext_trabajo: [data.economic[0]?.numext_trabajo ?? ''],
      numint_trabajo: [data.economic[0]?.numint_trabajo ?? ''],
      primer_cruce_trabajo: [data.economic[0]?.primer_cruce_trabajo ?? ''],
      segundo_cruce_trabajo: [data.economic[0]?.segundo_cruce_trabajo ?? ''],
      //pendientes
      otro_trabajo: [data.extra_work[0]?.id ? 'SI' : 'NO'],
      lugar_otro_trabajo: [data.extra_work[0]?.lugar ?? ''],
      jefe_otro_trabajo: [data.extra_work[0]?.jefe_inmediato ?? ''],
      telefono_otro_trabajo: [data.extra_work[0]?.telefono ?? ''],
      entrada_otro_trabajo: [data.extra_work[0]?.entrada ?? ''],
      salida_otro_trabajo: [data.extra_work[0]?.salida ?? ''],
      //TODO BIEN con ingreso mensual
      ingreso_mensual_bruto: [data.economic[0]?.ingreso_mensual_bruto],
      ingreso_mensual_neto: [data.economic[0]?.ingreso_mensual_neto],
    });

    // Obtén el FormArray 'parents' y agrega el nuevo FormGroup
    const parentsFormArray = this.miFormularioParents.get('parents') as FormArray;
    parentsFormArray.push(nuevoFormGroup);
    this.mostrarDatosBeneficiary.push(false);
    
  };

  miFormulario: FormGroup = this.fb.group({
    address_id: [null, [Validators.nullValidator]],
    curp: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/)]],
    nombre: ['', [Validators.required]],
    apaterno: ['', [Validators.required]],
    amaterno: ['', [Validators.required]],
    fechanacimiento: ['', [Validators.required]],
    edad: ['', [Validators.nullValidator]],
    escolaridad: ['', [Validators.required]],
    calle: ['', [Validators.required]],
    numext: ['', [Validators.required]],
    numint: ['', [Validators.nullValidator]],
    primercruce: ['', [Validators.required]],
    segundocruce: ['', [Validators.nullValidator]],
    codigopostal: ['', [Validators.required]],
    estado: [{ value: '', disabled: true }, [Validators.nullValidator]],
    municipio: [{ value: '', disabled: true }, [Validators.nullValidator]],
    colonia: ['', [Validators.required]],
    colonia_name: ['', [Validators.nullValidator]],
    vivienda: ['', [Validators.nullValidator]],//PENDIENTE
    sexo: ['', [Validators.required]],
    tipo_sangre: ['', [Validators.required]],
    lenguamaterna: ['', [Validators.nullValidator]],
    serviciosmedicos: ['', [Validators.nullValidator]],
    celular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

    ocupacion: ['', [Validators.required]],
    parentesco: ['', [Validators.required]],
    lugar_nacimiento: ['', [Validators.required]],
    estado_civil: ['', [Validators.required]],
    estado_religioso: ['', [Validators.required]],
    trabaja: ['', [Validators.required]],
    lugar_trabajo: ['', [Validators.nullValidator]],
    calle_trabajo: ['', [Validators.nullValidator]],
    telefono_trabajo: ['', [Validators.nullValidator, Validators.pattern('^[0-9]{10}$')]],
    jefe_inmediato: ['', [Validators.nullValidator]],
    codigo_trabajo: ['', [Validators.nullValidator]],
    colonia_trabajo: ['', [Validators.nullValidator]],
    colonia_name_trabajo: ['', [Validators.nullValidator]],
    municipio_trabajo: [{ value: '', disabled: true }, [Validators.nullValidator]],
    estado_trabajo: ['', [Validators.nullValidator]],
    entrada_trabajo: ['', [Validators.nullValidator]],
    salida_trabajo: ['', [Validators.nullValidator]],
    //new 
    puesto: ['', [Validators.nullValidator]],
    antiguedad: ['', [Validators.nullValidator]],
    numext_trabajo: ['', [Validators.nullValidator]],
    numint_trabajo: ['', [Validators.nullValidator]],
    primer_cruce_trabajo: ['', [Validators.nullValidator]],
    segundo_cruce_trabajo: ['', [Validators.nullValidator]],
    //pendientes
    otro_trabajo: ['', [Validators.nullValidator]],
    lugar_otro_trabajo: ['', [Validators.nullValidator]],
    jefe_otro_trabajo: ['', [Validators.nullValidator]],
    telefono_otro_trabajo: ['', [Validators.nullValidator, Validators.pattern('^[0-9]{10}$')]],
    entrada_otro_trabajo: ['', [Validators.nullValidator]],
    salida_otro_trabajo: ['', [Validators.nullValidator]],
    //TODO BIEN con ingreso mensual
    ingreso_mensual_bruto: ['', [Validators.required]],
    ingreso_mensual_neto: ['', [Validators.required]],
  });

  beneficiaries: any = [];
  curp: boolean = false;
  postalCode: boolean;
  postalCodeJob: boolean;
  suburbs: any = null;
  suburbsJob: any = null;
  newData: boolean = true;
  economic: boolean = false;
  job: boolean = false;
  request_id: any;
  suburbs2: any = null;
  mostrarDatosBeneficiary: boolean[] = [];
  hayError: boolean = false;
  diseases: any = null;
  ocupacion: any = [];
  onlySee: boolean = false;
  escolaridad: any = [];
  estados: any = [];
  extraWork: boolean = false;
  request: any;
  addresses: any = [];
  address: any = [];
  edit: boolean = false;
  beneficiaryUpdateId: number = 0;

  confirmarDireccion(index: number): void {
    const direccionConfirmada = this.addresses[index];
    
    this.miFormulario.patchValue({
      address_id: direccionConfirmada.id,
      calle: direccionConfirmada.calle,
      numext: direccionConfirmada.numext,
      numint: direccionConfirmada.numint,
      primercruce: direccionConfirmada.primercruce,
      segundocruce: direccionConfirmada.segundocruce,
      codigopostal: direccionConfirmada.codigopostal,
      estado: direccionConfirmada.estado,
      municipio: direccionConfirmada.municipio,
      colonia: direccionConfirmada.colonia,
    })

    this.miFormulario.get('calle').disable();
    this.miFormulario.get('numext').disable();
    this.miFormulario.get('numint').disable();
    this.miFormulario.get('primercruce').disable();
    this.miFormulario.get('segundocruce').disable();
    this.miFormulario.get('colonia').disable();
    this.validatorPostCode();
    
  }

  negarDireccion(index: number): void {
    // Elimina el elemento del array
    this.addresses.splice(index, 1);
  }

  validatorCurp() {
    
    this.crecheService.fetchCurp(this.miFormulario.value.curp).subscribe({
      next: (response) => {
        if (response.not) {
          
          this.showAlert('No se encuentra la CURP.', 'error');
        }
        if (response.id || response.nombre) {
          this.curp = true;
          const formValues = {
            nombre: response.nombre || '',
            apaterno: response.apaterno || '',
            amaterno: response.amaterno || '',
            fechanacimiento: response.fechanacimiento || '',
            edad: response.edad || '',
            sexo: response.sexo || '',
            calle: '',
            codigopostal: '',
            estado: '',
            municipio: '',
            numext: '',
            numint: '',
            primercruce: '',
            segundocruce: '',
            // colonia: '',
            // celular: '',
            enfermedad: '',
            enfermedad_otro: '',
            escolaridad: '',
          };
          if (response.id) {
            formValues.calle = response.calle || '';
            formValues.codigopostal = response.codigopostal || '';
            formValues.estado = response.estado || '';
            formValues.municipio = response.municipio || '';
            formValues.numext = response.numext || '';
            formValues.numint = response.numint || '';
            formValues.primercruce = response.primercruce || '';
            formValues.segundocruce = response.segundocruce || '';
            formValues.escolaridad = response.escolaridad || '';
            // formValues.colonia = response.colonia || '';
            // formValues.celular = response.celular || ''; 
            formValues.enfermedad = response.enfermedad || '';
            formValues.enfermedad_otro = response.enfermedad_otro || '';
          }
          this.miFormulario.patchValue(formValues);
          this.miFormulario.get('curp').setValue(response.curp);
          this.miFormulario.get('curp').disable();
          this.miFormulario.get('nombre').disable();
          this.miFormulario.get('apaterno').disable();
          this.miFormulario.get('amaterno').disable();
          this.miFormulario.get('fechanacimiento').disable();
          this.miFormulario.get('edad').disable();
          this.miFormulario.get('sexo').disable();
          
        }
      },
      error: (error) => {
        
        this.hayError = true;
      },
    });
  };

  beJob() {
    
    const jobFields = [
      'lugar_trabajo', 'calle_trabajo', 'telefono_trabajo', 'jefe_inmediato',
      'codigo_trabajo', 'colonia_trabajo', 'municipio_trabajo',
      'entrada_trabajo', 'salida_trabajo', 'puesto', 'antiguedad',
      'numext_trabajo', 'primer_cruce_trabajo'
    ];

    if (this.miFormulario.value.trabaja == 1) {
      this.job = true;
      this.addValidators(jobFields, Validators.required);
    } else {
      this.job = false;
      this.clearValidators(jobFields);
    }
    
  }

  extraJob() {
    
    const extraJobFields = [
      'otro_trabajo', 'jefe_otro_trabajo', 'telefono_otro_trabajo',
      'entrada_otro_trabajo', 'salida_otro_trabajo', 'lugar_otro_trabajo'
    ];

    if (this.miFormulario.value.otro_trabajo == 1) {
      this.extraWork = true;
      this.addValidators(extraJobFields, Validators.required);
    } else {
      this.extraWork = false;
      this.clearValidators(extraJobFields);
    }
    
  }

  private addValidators(fields: string[], validator: ValidatorFn): void {
    fields.forEach(field => {
      this.miFormulario.get(field).setValidators(validator);
      this.miFormulario.get(field).updateValueAndValidity();
    });
  }

  private clearValidators(fields: string[]): void {
    fields.forEach(field => {
      this.miFormulario.get(field).clearValidators();
      this.miFormulario.get(field).updateValueAndValidity();
    });
  }


  backPostCode() {
    
    this.postalCode = false;
    this.miFormulario.patchValue({
      address_id: null,
      municipio: "",
      estado: "",
    });
    this.miFormulario.get('codigopostal').setValue("");
    this.miFormulario.get('codigopostal').enable();
    this.miFormulario.get('calle').enable();
    this.miFormulario.get('numext').enable();
    this.miFormulario.get('numint').enable();
    this.miFormulario.get('primercruce').enable();
    this.miFormulario.get('segundocruce').enable();
    this.miFormulario.get('colonia').enable();
    this.suburbs = [];
    
  }

  backPostCodeJob() {
    
    this.postalCodeJob = false;
    this.miFormulario.patchValue({
      municipio_trabajo: "",
      estado_trabajo: "",
    });
    this.miFormulario.get('codigo_trabajo').setValue("");
    this.miFormulario.get('codigo_trabajo').enable();
    this.suburbsJob = [];
    
  };

  backCurp() {
    
    this.curp = false;
    this.miFormulario.patchValue({
      nombre: "",
      amaterno: "",
      apaterno: "",
      sexo: "",
      edad: "",
      fechanacimiento: "",
      enfermedad: "",
      enfermedad_otro: "",
    });
    this.miFormulario.get('curp').setValue("");
    this.miFormulario.get('curp').enable();
    this.miFormulario.get('nombre').enable();
    this.miFormulario.get('apaterno').enable();
    this.miFormulario.get('amaterno').enable();
    this.miFormulario.get('fechanacimiento').enable();
    this.miFormulario.get('edad').enable();
    this.miFormulario.get('sexo').enable();
    
  };

  validatorPostCode() {
    
    console.log(this.miFormulario.value.codigopostal);
    this.crecheService.getPostalCodeInfo(this.miFormulario.value.codigopostal).subscribe({
      next: (response) => this.handlePostalCodeResponse(response),
      error: (error) => {
        
        this.hayError = true;
      }
    });
  }

  validatorPostCodeJob() {
    
    this.crecheService.getPostalCodeInfo(this.miFormulario.value.codigo_trabajo).subscribe({
      next: (response) => this.handlePostalCodeResponse(response, true),
      error: (error) => {
        
        this.hayError = true;
      }
    });
  }


  private handlePostalCodeResponse(response: any, isJob: boolean = false): void {
    if (response[0]?.id) {
      const postalCodeField = isJob ? 'codigo_trabajo' : 'codigopostal';
      const municipioField = isJob ? 'municipio_trabajo' : 'municipio';
      const estadoField = isJob ? 'estado_trabajo' : 'estado';

      const updateValue = {
        [municipioField]: response[0].municipio,
        [estadoField]: response[0].estado
      };

      this.miFormulario.patchValue(updateValue);
      this.miFormulario.get(postalCodeField).setValue(response[0].codigo);
      this.miFormulario.get(postalCodeField).disable();

      if (isJob) {
        this.postalCodeJob = true;
        this.suburbsJob = response;
      } else {
        this.postalCode = true;
        this.suburbs = response;
      }
      
    } else {
      
      this.showAlert('Este Codigo postal no Existe.', 'error');
    }
  }


  ngOnInit(): void {
    this.cardParents();
    this.initTable();

    const phoneFields = ['telefono_trabajo', 'celular', 'telefono_otro_trabajo'];

    phoneFields.forEach(field => {
      this.subscribeToPhoneFieldChanges(field);
    });
  }

  private subscribeToPhoneFieldChanges(fieldName: string): void {
    this.miFormulario.get(fieldName).valueChanges.subscribe(value => {
      const newValue = value.replace(/\D/g, ''); // Remueve todos los caracteres que no sean dígitos
      this.miFormulario.get(fieldName).setValue(newValue, { emitEvent: false }); // Actualiza el valor en el formulario
    });
  };

  cardParents() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.request_id = params['id'];
      if (id) {
        this.allVisitorService.getBeneficiariesRequest(id).subscribe({
          next: (response) => {
            this.beneficiaries = response;
            if (this.beneficiaries[1]?.id) {
              this.onlySee = true;
              const data = this.beneficiaries[1];
              this.addParent(data);
            }
            if (this.beneficiaries[2]?.id) {
              const data = this.beneficiaries[2];
              this.addParent(data);
            }
            this.miFormularioParents.disable();
          }
        });
        this.allVisitorService.showRequest(id).subscribe({
          next: (response) => {
            this.request = response;
          }
        });
      };
    });
  }

  private initTable() {
    this.route.params.subscribe(params => {
      this.request_id = params['id'];
    });

    this.crecheService.getCatalogs().subscribe({
      next: (catalogs) => {
        this.estados = catalogs.estados;
        this.escolaridad = catalogs.escolaridad;
        this.ocupacion = catalogs.ocupacion;
        this.diseases = catalogs.enfermedad;
      }, error: () => {
        this.hayError = true;
      }
    });

    this.allVisitorService.getAddressRequest(this.request_id).subscribe({
      next: (response) => {
        this.addresses = response;
      }
    })
  };

  onSubmit() {
    if (!this.isValidForm()) {
      return;
    }

    

    this.enableDisableFormFields(true);
    let data = this.miFormulario.value;
    this.enableDisableFormFields(false);

    data['request_id'] = this.request_id;

    this.edit ? this.submitFormDataUpdate(data, this.beneficiaryUpdateId) : this.submitFormDataCreate(data);
  }

  private enableDisableFormFields(enable: boolean): void {
    const method = enable ? 'enable' : 'disable';
    const fields = ['codigopostal', 'estado', 'municipio', 'codigo_trabajo', 'municipio_trabajo', 'curp', 'nombre', 'apaterno', 'amaterno', 'fechanacimiento', 'edad', 'sexo'];

    fields.forEach(field => this.miFormulario.get(field)[method]());
  }

  private submitFormDataCreate(data: any): void {
    this.crecheService.createParentRequest(data).subscribe(response => {
      if (response) {
        this.resetFormState();
        this.showAlert('Información de tutor guardada correctamente', 'success');
      } else {
        
        this.showAlert('Error', 'error');
      }
    });
  }

  private submitFormDataUpdate(data: any, id: number): void {
    this.crecheService.updateParentRequest(data, id, null).subscribe(response => {
      if (response) {
        this.resetFormState();
        this.showAlert('Información de tutor actualizada correctamente', 'success');
      } else {
        
        this.showAlert('Error', 'error');
      }
    });
  }

  private resetFormState(): void {
    // Detiene el indicador de carga
    
    this.edit = false;
    this.beneficiaryUpdateId = 0;

    // Restablece los estados de control específicos del formulario
    this.curp = false;
    this.postalCode = false;
    this.postalCodeJob = false;
    this.economic = false;
    this.job = false;
    this.extraWork = false;

    // Habilita los campos del formulario usando la función auxiliar
    this.enableDisableFormFields(true);

    // Limpia el formulario principal y el de los padres
    this.miFormulario.reset();
    const parentsArray = this.miFormularioParents.get('parents') as FormArray;
    parentsArray.clear();

    // Lógica adicional para volver a cargar o actualizar la vista, si es necesario
    this.cardParents();
  }


  private isValidForm(): boolean {
    if (!this.curp) {
      this.showAlert('Debes de validar la CURP.', 'info');
      return false;
    }

    if (!this.postalCode) {
      this.showAlert('Debes de validar el codigo postal de tu domicilio.', 'info');
      return false;
    }

    if (this.miFormulario.value.trabaja == 1 && !this.postalCodeJob) {
      this.showAlert('Debes de validar el codigo postal del trabajo.', 'info');
      return false;
    }

    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return false;
    }

    return true;
  }

  private showAlert(message: string, icon: 'success' | 'error' | 'info') {
    
    Swal.fire({
      position: 'center',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  loadingUpdate(beneficiary: any): void {
    this.edit = true;
    this.beneficiaryUpdateId = beneficiary.id;

    this.miFormulario.patchValue(beneficiary);
    this.validatorCurp();
    this.miFormulario.patchValue(beneficiary.address[0]);
    this.miFormulario.patchValue({ 'address_id': beneficiary.address[0].id });
    this.validatorPostCode();
    this.miFormulario.patchValue({ 'celular': beneficiary?.address[0]?.celular });
    this.miFormulario.patchValue(beneficiary.economic[0]);
    if (beneficiary.economic[0].trabaja == 1) {
      this.beJob();
      this.validatorPostCodeJob();
    }
    if (beneficiary.extra_work.length >= 1) {
      this.miFormulario.patchValue(beneficiary.extra_work[0]);
      this.extraJob();
    }
  }
};