import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrecheService } from '../../services/creche.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AllVisitorService } from '../../services/all-visitor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-parent',
  templateUrl: './form-parent.component.html',
  styleUrls: ['./form-parent.component.css']
})
export class FormParentComponent {
  constructor(private router: Router,private fb: FormBuilder, private crecheService: CrecheService, private route: ActivatedRoute, private allVisitorService: AllVisitorService) {
    this.miFormulario.get('colonia')?.valueChanges.subscribe((selectedColoniaId) => {
      // Verificar que suburb esté definido y no sea null
      if (this.suburbs && this.suburbs.length > 0) {
        const selectedColonia = this.suburbs.find(suburb => suburb.id == selectedColoniaId);
        // Verificar que selectedColonia esté definido y no sea null
        if (selectedColonia) {
          this.miFormulario.patchValue({
            colonia_name: selectedColonia.colonia
          });
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

  

  defaultIfNullOrZero(value: any, defaultValue: any): any {
    return value === null || value === undefined || value === 0 ? defaultValue : value;
  }


  miFormulario: FormGroup = this.fb.group({
    address_id: [null, [Validators.nullValidator]],
    curp: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/)]],
    nombre: ['', [Validators.required]],
    apaterno: ['', [Validators.required]],
    amaterno: ['', [Validators.required]],
    fechanacimiento: ['', [Validators.required]],
    edad: ['', [Validators.nullValidator]],
    escolaridad: ['', [Validators.required]],
    trabaja: 1,
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
    sexo: ['', [Validators.required]],
    tipo_sangre: ['', [Validators.required]],
    lenguamaterna: ['', [Validators.nullValidator]],
    serviciosmedicos: ['', [Validators.nullValidator]],
    celular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

    parentesco: ['', [Validators.required]],
    lugar_nacimiento: ['', [Validators.required]],
    estado_civil: ['', [Validators.required]],
    lugar_trabajo: [{ value: '', disabled: true }, [Validators.required]],
    calle_trabajo: ['', [Validators.required]],
    telefono_trabajo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    telefono_ext_trabajo: ['', [Validators.nullValidator]],
    jefe_inmediato: ['', [Validators.required]],
    codigo_trabajo: ['', [Validators.required]],
    colonia_trabajo: ['', [Validators.required]],
    colonia_name_trabajo: ['', [Validators.nullValidator]],
    municipio_trabajo: [{ value: '', disabled: true }, [Validators.required]],
    estado_trabajo: ['', [Validators.required]],
    entrada_trabajo: ['', [Validators.required]],
    salida_trabajo: ['', [Validators.required]],
    //new 
    puesto: [{ value: '', disabled: true }, [Validators.required]],
    employee_number: [{ value: '', disabled: true }, [Validators.required]],

    antiguedad: ['', [Validators.required]],
    numext_trabajo: ['', [Validators.required]],
    numint_trabajo: ['', [Validators.nullValidator]],
    primer_cruce_trabajo: ['', [Validators.required]],
    segundo_cruce_trabajo: ['', [Validators.nullValidator]],
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
  dependences: any = [];


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

    const phoneFields = ['telefono_trabajo', 'celular', 'telefono_ext_trabajo'];

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
              this.miFormulario.patchValue(data);
              this.miFormulario.patchValue(data.economic[0]);
              this.miFormulario.patchValue(data.address[0]);
              this.postalCode = true;
              this.postalCodeJob = true;
              this.miFormulario.disable();
            }
          }
        });
        this.allVisitorService.showRequest(id).subscribe({
          next: (response) => {
            this.miFormulario.patchValue({
              puesto: response.employee.job_position,
              lugar_trabajo: response.employee.dependence_id,
              employee_number: response.employee.employee_number
            })
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
        this.dependences = catalogs.dependencias;
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
    // const fields = ['codigopostal', 'estado', 'municipio', 'codigo_trabajo', 'municipio_trabajo', 'curp', 'nombre', 'apaterno', 'amaterno', 'fechanacimiento', 'edad', 'sexo'];
    const fields = ['codigopostal', 'estado', 'municipio', 'codigo_trabajo', 'municipio_trabajo', 'puesto', 'lugar_trabajo','employee_number'];
    fields.forEach(field => this.miFormulario.get(field)[method]());
  }

  private submitFormDataCreate(data: any): void {
    this.crecheService.createParentRequest(data).subscribe(response => {
      if (response.code == 200) {
        this.cardParents();
        Swal.fire({
          position: 'center',
          icon: 'question',
          title: 'Información de trabajador guardada correctamente ¿quieres continuar con la documentación?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: `No`
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/cisz-guarderia/solicitud/' + this.request_id + '/documentos');
          } else if (result.isDenied) {
            return;
          }
        })
      } else {
        this.showAlert('Error', 'error');
      }
    });
  }

  private submitFormDataUpdate(data: any, id: number): void {
    this.crecheService.updateParentRequest(data, id, null).subscribe(response => {
      if (response) {
        
        this.showAlert('Información de tutor actualizada correctamente', 'success');
        this.cardParents();
      } else {
        
        this.showAlert('Error', 'error');
      }
    });
  }

  private isValidForm(): boolean {
    // if (!this.curp) {
    //   this.showAlert('Debes de validar la CURP.', 'info');
    //   return false;
    // }

    if (!this.postalCode) {
      this.showAlert('Debes de validar el codigo postal de tu domicilio.', 'info');
      return false;
    }

    if (!this.postalCodeJob) {
      this.showAlert('Debes de validar el codigo postal del trabajo.', 'info');
      return false;
    }

    if (this.miFormulario.invalid) {
      // Marcar todos los campos como tocados para mostrar los mensajes de error
      this.miFormulario.markAllAsTouched();

      // // Obtener las claves de los controles inválidos
      const keysInvalidas = Object.keys(this.miFormulario.controls).filter(key => {
        return this.miFormulario.get(key).invalid;
      });

      // // Mostrar las claves inválidas en forma de texto o en un array
      const textoKeysInvalidas = keysInvalidas.join(', '); // En forma de texto separado por comas
      console.log('Claves inválidas:', textoKeysInvalidas);

      // // Opcionalmente, mostrarlas en un array
      console.log('Claves inválidas:', keysInvalidas);

      // Mostrar la alerta o realizar cualquier otra acción
      this.showAlert('Revisa que hayas llenado todos los campos obligatorios.', 'info');
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

  loadingUpdate(): void {
    this.edit = true;
    this.onlySee = false;
    this.miFormulario.enable();
    this.validatorPostCode();
    this.validatorPostCodeJob();
    this.enableDisableFormFields(false);
    this.beneficiaryUpdateId = this.beneficiaries[1].id;
  }
}
