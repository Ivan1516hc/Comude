import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllVisitorService } from '../../services/all-visitor.service';
import { CrecheService } from '../../services/creche.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-references',
  templateUrl: './form-references.component.html',
  styleUrls: ['./form-references.component.css']
})
export class FormReferencesComponent {

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private allVisitorService: AllVisitorService, private crecheService: CrecheService) {
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
  }

  addReferences(data: any) {
    for (var val of data) {
      
      const nuevoFormGroup = this.fb.group({
        nombre: val?.nombre,
        apaterno: val?.apaterno,
        amaterno: val?.amaterno,

        calle: val?.calle,
        numext: val?.numext,
        numint: val?.numint,
        codigopostal: val?.codigopostal ?? '',
        estado: val?.estado,
        municipio: val?.municipio,
        colonia: val?.colonia_name,

        telefono: val?.telefono,
        celular: val?.celular,
        horario_contacto_1: val?.horario_contacto_1,
        horario_contacto_2: val?.horario_contacto_2,
      });
      // Obtén el FormArray 'parents' y agrega el nuevo FormGroup
      const referenceFormArray = this.miFormularioReferences.get('references') as FormArray;
      referenceFormArray.push(nuevoFormGroup);
      this.mostrarDatos.push(false);
      
    }
    this.miFormularioReferences.disable();

  };

  mostrarDatos: boolean[] = [];

  miFormularioReferences: FormGroup = this.fb.group({
    references: new FormArray([]),
  });

  get references(): FormArray {
    return this.miFormularioReferences.get('references') as FormArray;
  };

  getParentFormGroup(index: number): FormGroup {
    return this.references.at(index) as FormGroup;
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apaterno: ['', [Validators.required]],
    amaterno: ['', [Validators.required]],

    calle: ['', [Validators.required]],
    numext: ['', [Validators.required]],
    numint: ['', [Validators.nullValidator]],
    codigopostal: ['', [Validators.required]],
    estado: [{ value: '', disabled: true }, [Validators.nullValidator]],
    municipio: [{ value: '', disabled: true }, [Validators.nullValidator]],
    colonia: ['', [Validators.required]],
    colonia_name: ['', [Validators.nullValidator]],

    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    celular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    horario_contacto_1: ['', [Validators.required]],
    horario_contacto_2: ['', [Validators.required]],
  });

  onlySee: boolean = false;
  postalCode: boolean = false;
  suburbs: any = null;
  request_id: any;
  exist: boolean = false;
  
  urlPrincipal: string;
  contador: number = 3;
  request: any;

  ngOnInit(): void {
    this.obtenerURLPrincipal();
    const parentsArray = this.miFormularioReferences.get('references') as FormArray;
    parentsArray.clear();
    this.initTable();

    const phoneFields = ['telefono', 'celular'];

    phoneFields.forEach(field => {
      this.subscribeToPhoneFieldChanges(field);
    });
  }

  obtenerURLPrincipal() {
    const urlCompleta = this.router.url;
    const segmentos = urlCompleta.split('/');
    this.urlPrincipal = '/' + segmentos[1];

    if (this.urlPrincipal == '/cisz-guarderia') {
      this.contador = 2;
    }
  }

  private subscribeToPhoneFieldChanges(fieldName: string): void {
    this.miFormulario.get(fieldName).valueChanges.subscribe(value => {
      const newValue = value.replace(/\D/g, ''); // Remueve todos los caracteres que no sean dígitos
      this.miFormulario.get(fieldName).setValue(newValue, { emitEvent: false }); // Actualiza el valor en el formulario
    });
  };


  hayError: boolean = false;
  statusHouse: any = [];
  dataReferences: any = [];

  onSubmit() {
    if (this.postalCode != true) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Validar el código postal de la referencia.',
        showConfirmButton: false,
        timer: 2000
      })
    }
    this.miFormulario.patchValue({
      request_id: this.request_id,
    })

    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }

    this.miFormulario.enable();
    let data = this.miFormulario.value;
    this.miFormulario.get('codigopostal').disable();
    this.miFormulario.get('municipio').disable();
    this.miFormulario.get('estado').disable();
    data['request_id'] = this.request_id;
    this.allVisitorService.createReferencesRequest(data).subscribe({
      next: (response) => {
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
          this.ngOnInit();
          this.miFormulario.get('codigopostal').enable();
          this.miFormulario.reset();
          this.postalCode = false;
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
        }
      }, error: (error) => {
        Swal.fire("Error", "error")
      }
    })
  }

  private initTable() {
    this.route.params.subscribe(params => {
      this.request_id = params['id'];
      this.allVisitorService.showReferencesVisitor(this.request_id).subscribe({
        next: (response) => {
          if (!response.code && response.references.length >= 1) {
            this.referencias = response;
            this.addReferences(response?.references);
            if (response.references.length >= 4) {
              this.miFormulario.disable();
              this.onlySee = true;
            }
          }
        }, error: (error) => {
          Swal.fire("Error", "error")
        }
      })

      this.allVisitorService.showRequest(this.request_id).subscribe({
        next: (response) => {
          this.request = response;

          if (this.request.procedure_id == 1 && this.request.status_request_id == 7) {
            Swal.fire({
              position: 'center',
              icon: 'info',
              title: 'Has terminado todos los formularios ¿quieres enviar la solicitud a revición?',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Si',
              cancelButtonText: `No`
            }).then((result) => {
              if (result.isConfirmed) {
                this.allVisitorService.changeStatusRequest({ id: this.request.id, status_request_id: 2 }).subscribe({
                  next: (response) => {
                    
                    if (response.code == 200) {
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: response.message,
                        showConfirmButton: true
                      })
                      

                      this.router.navigateByUrl('/dashboard');
                    } else {
                      Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 2000
                      })
                      
                    }
                  }, error: (error) => {
                    Swal.fire("Error", error);
                  }
                })
              } else if (result.isDenied) {
                return;
              }
            })
          }
        }
      });
    });
  }
  referencias: any;
  // cardParents() {
  //   console.log(this.postalCode);
  //   this.route.params.subscribe(params => {
  //     const id = params['id'];
  //     this.request_id = params['id'];
  //     if (id) {
  //       this.allVisitorService.showReferencesVisitor(id).subscribe({
  //         next: (response) => {
  //           this.dataReferences = response;
  //           if (this.dataReferences[0]?.id) {
  //             const data = this.dataReferences[0];
  //             this.addReferences(data);
  //           }
  //           if (this.dataReferences[1]?.id) {
  //             const data = this.dataReferences[1];
  //             this.addReferences(data);
  //           }
  //           if (this.dataReferences[2]?.id) {
  //             const data = this.dataReferences[2];
  //             this.addReferences(data);
  //             this.onlySee = true;
  //             this.miFormulario.disable();
  //           }
  //         }
  //       });
  //     };
  //   });
  // }

  backPostCode() {
    
    this.postalCode = false;
    this.miFormulario.patchValue({
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

  validatorPostCode() {
    
    this.crecheService.getPostalCodeInfo(this.miFormulario.value.codigopostal).subscribe({
      next: (response) => this.handlePostalCodeResponse(response),
      error: (error) => {
        
        this.hayError = true;
      }
    });
  }

  private handlePostalCodeResponse(response: any): void {
    if (response[0]?.id) {
      const postalCodeField = 'codigopostal';
      const municipioField = 'municipio';
      const estadoField = 'estado';

      const updateValue = {
        [municipioField]: response[0].municipio,
        [estadoField]: response[0].estado
      };

      this.miFormulario.patchValue(updateValue);
      this.miFormulario.get(postalCodeField).setValue(response[0].codigo);
      this.miFormulario.get(postalCodeField).disable();

      this.postalCode = true;
      this.suburbs = response;
      
    } else {
      
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Este Codigo postal no Existe.',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
}