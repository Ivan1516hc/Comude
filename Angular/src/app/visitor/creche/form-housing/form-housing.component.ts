import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllVisitorService } from '../../services/all-visitor.service';
import { CrecheService } from '../../services/creche.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';


@Component({
  selector: 'app-form-housing',
  templateUrl: './form-housing.component.html',
  styleUrls: ['./form-housing.component.css']
})

export class FormHousingComponent implements AfterViewInit {

  private geoCoder: any;

  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private allVisitorService: AllVisitorService, private crecheService: CrecheService) {
    this.miFormulario.get('colonia')?.valueChanges.subscribe((selectedColoniaId) => {
      // Verificar que suburb esté definido y no sea null
      if (this.suburbs && this.suburbs.length > 0) {

        const selectedColonia = this.suburbs.find(suburb => suburb.id == selectedColoniaId);
        console.log('Suburb:', selectedColonia);
        // Verificar que selectedColonia esté definido y no sea null
        if (selectedColonia) {
          this.miFormulario.patchValue({
            colonia_name: selectedColonia.colonia
          });
        } else {
          // Manejar el caso donde no se encuentra la colonia seleccionada
          console.error('Colonia no encontrada para el ID:', selectedColoniaId);
        }
      } else {

      }
    });
  }

  miFormulario: FormGroup = this.fb.group({
    address_id: [null, [Validators.nullValidator]],
    valor_estimado: ['', [Validators.required]],
    tipo_vivienda: ['', [Validators.required]],
    pago_mensual: ['', [Validators.nullValidator]],
    arrendador_propietario: ['', [Validators.required]],

    lat: ['', [Validators.required]],
    lng: ['', [Validators.required]],
    estado: '',
    colonia_name: '',

    calle: ['', Validators.required],
    numext: ['', Validators.required],
    numint: ['', Validators.nullValidator],
    primercruce: ['', Validators.required],
    segundocruce: ['', Validators.nullValidator],
    codigopostal: ['', Validators.required],
    colonia: ['', Validators.required],
    municipio: ['', Validators.required],

    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    contrato: ['', [Validators.nullValidator]],
    vive_con_familiares: ['', [Validators.required]],
    vencimiento_contrato: ['', [Validators.nullValidator]],
    cantidad_aporta: ['', [Validators.nullValidator]],
    horario_en_casa_1: ['', [Validators.required]],
    horario_en_casa_2: ['', [Validators.required]],

    vehiculos: new FormArray([
    ])
  });

  vehiculosArray = this.miFormulario.get('vehiculos') as FormArray;
  cuentaConVehiculoControl: FormControl = new FormControl(false);
  vehicles: any[] = [];

  get vehiculos(): FormArray {
    return this.miFormulario.get('vehiculos') as FormArray;
  }

  addVehiculo() {
    const vehiculosArray = this.miFormulario.get('vehiculos') as FormArray;

    vehiculosArray.push(
      new FormGroup({
        marca: new FormControl('', Validators.required),         // Marca es requerida
        tipo: new FormControl('', Validators.required),          // Tipo es requerido
        modelo: new FormControl('', Validators.required),        // Modelo es requerido
        valor_aproximado: new FormControl('', Validators.required), // Valor aproximado es requerido
      })
    );
  }

  deleteVehiculo() {
    const vehiculosArray = this.miFormulario.get('vehiculos') as FormArray;
    if (vehiculosArray.length > 0) {
      vehiculosArray.removeAt(vehiculosArray.length - 1);
    }
  }

  request_id: any;
  exist: boolean = false;
  
  latitude;
  longitude;
  zoom: number = 15;
  hayError: boolean = false;
  statusHouse: any = [];
  postalCode: boolean;
  suburbs: any = null;
  address: string;
  marker: any;
  addresses: any = [];

  ngOnInit(): void {
    this.initTable();

    this.cuentaConVehiculoControl.valueChanges.subscribe((value) => {
      if (value === true) {
        this.vehiculos.clear(); // Limpia la lista de vehículos
        this.addVehiculo(); // Añade un vehículo por defecto
      } else {
        this.vehiculos.clear(); // Limpia la lista si el usuario indica que no tiene vehículos
      }
    });
  }

  ngAfterViewInit(): void {
  }

  onSubmit() {
    this.miFormulario.get('codigopostal').enable();
    this.miFormulario.get('municipio').enable();
    this.miFormulario.patchValue({
      lat: this.latitude,
      lng: this.longitude
    });
    let data = this.miFormulario.value;
    this.miFormulario.get('codigopostal').disable();
    this.miFormulario.get('municipio').disable();
    if (this.miFormulario.invalid) {
      console.log(this.miFormulario.value)
      return this.miFormulario.markAllAsTouched();
    }
    data['request_id'] = this.request_id;

    this.allVisitorService.createHousingRequest(data).subscribe({
      next: (response) => {
        if (response.code == 200) {
          this.initTable();
          this.ngOnInit();
          Swal.fire({
            title: 'Información de vivienda creada Correctamente ¿Quieres continuar con la informacion de las referencias personales?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.miFormulario.reset();
              this.router.navigateByUrl('/guarderia/solicitud/' + this.request_id + '/referencia');
            } else if (result.isDenied) {
              this.ngOnInit();
            }
          })
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
        Swal.fire("Error", "error");
      }
    })
  }

  private initTable() {
    this.crecheService.getCatalogs().subscribe({
      next: (catalogs) => {
        this.statusHouse = catalogs.vivienda;
      }, error: () => {
        this.hayError = true;
      }
    });
    this.route.params.subscribe(params => {
      this.request_id = params['id'];
      this.allVisitorService.showHousingVisitor(this.request_id).subscribe({
        next: (response) => {
          if (response?.housing?.id) {
            this.miFormulario.patchValue({
              propia: response.housing.propia,
              valor_estimado: response.housing.valor_estimado,
              tipo_vivienda: response.housing.tipo_vivienda,
              pago_mensual: response.housing.pago_mensual,
              arrendador_propietario: response.housing.arrendador_propietario,

              calle: response.housing.address[0]?.calle,
              numext: response.housing.address[0]?.numext,
              numint: response.housing.address[0]?.numint,
              primercruce: response.housing.address[0]?.primercruce,
              segundocruce: response.housing.address[0]?.segundocruce,
              codigopostal: response.housing.address[0]?.codigopostal,
              colonia: response.housing.address[0]?.colonia_name,
              municipio: response.housing.address[0]?.municipio,

              telefono: response.housing.telefono,
              contrato: response.housing.contrato,
              vive_con_familiares: response.housing.vive_con_familiares,
              vencimiento_contrato: response.housing.vencimiento_contrato,
              cantidad_aporta: response.housing.cantidad_aporta,
              horario_en_casa_1: response.housing.horario_en_casa_1,
              horario_en_casa_2: response.housing.horario_en_casa_2,
            })
            this.vehicles = response.vehicle;
            this.miFormulario.disable();
            this.exist = true;
            this.postalCode = true;
            this.validatorPostCode();
          }
        }, error: (error) => {
          console.log(error);
        }
      })
      this.allVisitorService.getAddressRequest(this.request_id).subscribe({
        next: (response) => {
          this.addresses = response;
        }
      })
    });
  }

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
      colonia: direccionConfirmada.colonia,
      municipio: direccionConfirmada.municipio,
    });
    // this.miFormulario.get('calle').disable();
    // this.miFormulario.get('numext').disable();
    // this.miFormulario.get('numint').disable();
    // this.miFormulario.get('primercruce').disable();
    // this.miFormulario.get('segundocruce').disable();
    // this.miFormulario.get('colonia').disable();

    this.validatorPostCode();
  }

  negarDireccion(index: number): void {
    // Elimina el elemento del array
    this.addresses.splice(index, 1);
  }

  tipoVivienda() {
    // Asegúrate de que el control 'pago_mensual' actualice sus validadores según el tipo de vivienda
    if (this.miFormulario.value.tipo_vivienda != 1) {
      this.miFormulario.get('pago_mensual').setValidators(Validators.required);
      this.miFormulario.get('pago_mensual').updateValueAndValidity(); // No olvides llamar a esto
    } else {
      this.miFormulario.get('pago_mensual').clearValidators();
      this.miFormulario.get('pago_mensual').updateValueAndValidity(); // Siempre actualiza la validez
    }
  }

  vencimientoContrato() {
    if (this.miFormulario.value.contrato == 1) {
      this.miFormulario.get('vencimiento_contrato').setValidators(Validators.required);
    } else {
      this.miFormulario.get('vencimiento_contrato').clearValidators();
    }
    this.miFormulario.get('vencimiento_contrato').updateValueAndValidity();
  }

  cantidadAporta() {
    if (this.miFormulario.value.vive_con_familiares == 1) {
      this.miFormulario.get('cantidad_aporta').setValidators(Validators.required);
    } else {
      this.miFormulario.get('cantidad_aporta').clearValidators();
    }
    this.miFormulario.get('cantidad_aporta').updateValueAndValidity();
  }

  validatorPostCode() {
    this.crecheService.getPostalCodeInfo(this.miFormulario.value.codigopostal).subscribe({
      next: (response) => {
        if (response[0]?.id) {
          this.postalCode = true;
          this.miFormulario.patchValue({
            municipio: response[0].municipio,
            estado: response[0].estado,
          });
          this.miFormulario.get('codigopostal').setValue(response[0].codigo);
          this.miFormulario.get('codigopostal').disable();
          this.miFormulario.get('municipio').disable();
          this.suburbs = response;
        }
        if (response.length == 0) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Este Codigo postal no Existe.',
            showConfirmButton: true
          })
        }

      }, error: (error) => {
        this.hayError = true;
      }
    });
  };

  backPostCode() {
    this.postalCode = false;
    this.miFormulario.patchValue({
      municipio: "",
      estado: "",
    });
    this.miFormulario.get('codigopostal').setValue("");
    this.miFormulario.get('codigopostal').enable();
    this.miFormulario.get('municipio').enable();
    this.miFormulario.get('address_id').enable();
    this.miFormulario.get('calle').enable();
    this.miFormulario.get('numext').enable();
    this.miFormulario.get('numint').enable();
    this.miFormulario.get('primercruce').enable();
    this.miFormulario.get('segundocruce').enable();
    this.miFormulario.get('colonia').enable();
    this.suburbs = [];
  }


  getUbicacionByAddress() {
    this.geoCoder = new google.maps.Geocoder();
    const address = this.miFormulario.get('numext').value + ' ' + this.miFormulario.get('calle').value + ', ' + this.miFormulario.get('colonia_name').value + ', ' + this.miFormulario.get('municipio').value + ', México.';
    this.geoCoder.geocode({ address: address }, (results: any, status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
          this.marker = {
            position: {
              lat: this.latitude,
              lng: this.longitude,
            },
            title: 'Direccion',
            options: {
              animation: google.maps.Animation.DROP,
              draggable: false, // Permitir arrastrar el marcador
            },
          };

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    // Verifica si el evento contiene las coordenadas
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Aquí puedes hacer lo que necesites con las coordenadas
      console.log(`Latitud: ${lat}, Longitud: ${lng}`);

      // Por ejemplo, actualizar las propiedades de latitud y longitud de tu componente
      this.latitude = lat;
      this.longitude = lng;

      // Si deseas, también puedes actualizar el marcador
      this.getAddress(lat, lng)
    }
  }



  getAddress(latitude: number, longitude: number) {
    this.geoCoder = new google.maps.Geocoder();
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results: any, status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.zoom = 15;

          this.marker = {
            position: {
              lat: latitude,
              lng: longitude,
            },
            title: 'Dirección',
            options: {
              animation: google.maps.Animation.DROP,
            },
            draggable: false
          };
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}