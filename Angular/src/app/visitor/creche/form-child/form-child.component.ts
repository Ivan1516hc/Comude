import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrecheService } from '../../services/creche.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AllVisitorService } from '../../services/all-visitor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-child',
  templateUrl: './form-child.component.html',
  styleUrls: ['./form-child.component.css']
})
export class FormChildComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private crecheService: CrecheService,
    private route: ActivatedRoute,
    private allVisitorService: AllVisitorService
  ) { }

  miFormulario: FormGroup;
  curp: boolean = false;
  showDiv: boolean = false;
  newData: boolean = true;
  request_id: any;
  onlySee: boolean = false;
  beneficiary_id: number;
  form_id: number = null;
  edit: boolean = false;
  
  hayError: boolean = false;
  diseases: any = null;
  request: any=null;
  urlPrincipal: string;

  ngOnInit(): void {
    this.obtenerURLPrincipal();
    
    this.initForm();
    this.initTable();
    this.route.params.subscribe(params => {
      const id = params['beneficiary'];
      this.request_id = params['id'];
      if (id) {
        this.showBeneficiaryVisitor(id);
      } else {
        this.getBeneficiariesRequest();
      }
    });
    
  }

  obtenerURLPrincipal() {
    const urlCompleta = this.router.url;
    const segmentos = urlCompleta.split('/');
    this.urlPrincipal = '/' + segmentos[1];
  }

  initForm(): void {
    this.miFormulario = this.fb.group({
      curp: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/)]],
      nombre: ['', [Validators.required]],
      apaterno: ['', [Validators.required]],
      amaterno: ['', [Validators.required]],
      fechanacimiento: ['', [Validators.required]],
      // edad: ['', [Validators.required]],
      edad: [0, [Validators.required]],
      sexo: ['', [Validators.required]],
      tipo_sangre: ['', [Validators.required]],
    });
  }

  showBeneficiaryVisitor(id: any): void {
    this.allVisitorService.showBeneficiaryVisitor(id).subscribe({
      next: (response) => {
        if(response.id){
          this.curp = true;
          this.showDiv = true;
          this.beneficiary_id = response.id;
          this.request = response.requests[0];
          this.populateForm(response);
          this.handleForm(response);
        }else{
          this.router.navigateByUrl(`${this.urlPrincipal}/solicitud/${this.request_id}/beneficiario`);
        }
      }
    });
  }

  getBeneficiariesRequest(): void {
    this.allVisitorService.getBeneficiariesRequest(this.request_id).subscribe({
      next: (response) => {
        if (response.length >= 1) {
          this.router.navigateByUrl(`${this.urlPrincipal}/beneficiario/${response[0].id}/${this.request_id}`);
        }
      }
    });
  }

  populateForm(response: any): void {
    this.miFormulario.patchValue({
      curp: response.curp,
      nombre: response.nombre,
      apaterno: response.apaterno,
      amaterno: response.amaterno,
      fechanacimiento: response.fechanacimiento,
      edad: response.edad,
      sexo: response.sexo,
      tipo_sangre: response.tipo_sangre,
    });
  }

  handleForm(response: any): void {
    const filteredForms = response?.requests[0]?.modify_forms?.filter(form => form.form_id == 1 && form.status == 0);
    if (filteredForms.length >= 1 && !this.edit) {
      this.form_id = filteredForms[0].id;
      this.edit = true;
      // this.miFormulario.disable();
      // this.miFormulario.get('tipo_sangre').enable();
    } else if (this.edit) {
      this.onlySee = false;
      this.newData = true;
      // this.miFormulario.disable();
      // this.miFormulario.get('tipo_sangre').enable();
    } else {
      this.miFormulario.disable();
      this.onlySee = true;
      this.newData = false;
    }
  }

  initTable(): void {
    this.crecheService.getCatalogs().subscribe({
      next: (catalogs) => {
        this.diseases = catalogs.enfermedad;
      }, error: () => {
        this.hayError = true;
      }
    });
  }

  onSubmit(): void {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }
    

    // this.enableFormControls();
    let data = this.miFormulario.value;
    // this.disableFormControls();
    this.onlySee = true;
    data['request_id'] = this.request_id;

    if (this.edit) {
      this.crecheService.updateBeneficiaryRequest(data, this.beneficiary_id, this.form_id).subscribe({
        next: (response) => {
          
          if (response.code == 200) {
            this.handleSuccessResponse(response);
            this.edit = false;
          } else {
            this.handleErrorResponse(response);
          }
        }, error: (error) => {
          
          Swal.fire("Error", "error")
        }
      });
    } else {
      this.crecheService.createBeneficiaryRequest(data).subscribe({
        next: (response) => {
          if (response.code == 200) {
            this.handleSuccessResponse(response);
          } else {
            this.handleErrorResponse(response);
          }
        }, error: (error) => {
          Swal.fire("Error", "error")
        }
      });
      
    }
  }

  handleSuccessResponse(response: any): void {
    this.curp = true;
    this.newData = false;
    this.showDiv = true;
    this.onlySee = true;
    this.miFormulario.disable();
    const message = this.edit ? 'Información del infante actualizada.' : 'Información del niño(a) guardada correctamente ¿desea continuar con la información del trabajador(a)?';
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
        this.router.navigateByUrl(this.urlPrincipal+'/solicitud/' + this.request_id + '/padres');
      } else if (result.isDenied) {
        this.router.navigateByUrl(this.urlPrincipal+'/beneficiario/' + response.beneficiary_id + '/' + this.request_id);
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

  loadingUpdate(): void {
    this.edit = true;
    this.ngOnInit();
  }

  validatorCurp(): void {
    
    this.crecheService.fetchCurp(this.miFormulario.value.curp).subscribe({
      next: (response) => {
        if (response.not) {
          
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se encuentra la CURP',
            showConfirmButton: true
          });
        }
        if (response.id) {
          this.curp = true;
          this.miFormulario.patchValue({
            nombre: response.nombre,
            amaterno: response.amaterno,
            apaterno: response.apaterno,
            sexo: response.sexo,
            edad: response.edad,
            fechanacimiento: response.fechanacimiento,
            enfermedad: response.enfermedad,
            enfermedad_otro: response.enfermedad_otro,
          });
          this.miFormulario.get('curp').setValue(response.curp);
          this.disableFormControls();
          
        } else if (response.nombre) {
          this.curp = true;
          this.miFormulario.patchValue({
            nombre: response.nombre,
            apaterno: response.apaterno,
            amaterno: response.amaterno,
            fechanacimiento: response.fechanacimiento,
            edad: response.edad,
            sexo: response.sexo,
            enfermedad: '',
            enfermedad_otro: '',
          });
          this.miFormulario.get('curp').setValue(response.curp);
          this.disableFormControls();
          
        }
      }, error: (error) => {
        
        console.log(error);
        this.hayError = true;
      }
    });
  }

  backCurp(): void {
    
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
    this.enableFormControls();
    
  }

  disableFormControls(): void {
    this.miFormulario.get('curp').disable();
    this.miFormulario.get('nombre').disable();
    this.miFormulario.get('apaterno').disable();
    this.miFormulario.get('amaterno').disable();
    this.miFormulario.get('fechanacimiento').disable();
    this.miFormulario.get('edad').disable();
    this.miFormulario.get('sexo').disable();
  }

  enableFormControls(): void {
    this.miFormulario.get('curp').enable();
    this.miFormulario.get('nombre').enable();
    this.miFormulario.get('apaterno').enable();
    this.miFormulario.get('amaterno').enable();
    this.miFormulario.get('fechanacimiento').enable();
    this.miFormulario.get('edad').enable();
    this.miFormulario.get('sexo').enable();
  }

}