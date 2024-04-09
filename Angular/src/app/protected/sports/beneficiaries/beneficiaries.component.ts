import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AllService } from '../../services/all.service';
import { Subject, debounceTime } from 'rxjs';
import { differenceInDays, differenceInMonths, differenceInYears, parse } from 'date-fns';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css']
})
export class BeneficiariesComponent {
  searchTerm: any = '';
  searchTermChanged: Subject<string> = new Subject<string>();
  beneficiary: any;
  creche_id: any;
  hayError: boolean = false;
  diseases = [];
  housing = [];

  beneficiaries: any;
  data: any=[];

  constructor(private fb: FormBuilder,  private allService: AllService, private http: HttpClient) {
    this.searchTermChanged.pipe(
      debounceTime(1000) // Cambia este valor según el tiempo que desees esperar después de escribir
    ).subscribe(() => {
      // Realiza la acción deseada aquí, como realizar una búsqueda
      this.realizarBusqueda();
    });
  }

  miFormularioService: FormGroup = this.fb.group({
    curp: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{15,}$/)]]
  });

  onInputChange() {
    const curpControl = this.miFormularioService.get('curp');
    if (curpControl.value) {
      curpControl.setValue(curpControl.value.toUpperCase(), { emitEvent: false });
    }
  }


  // Función para manejar el cambio de página
  onPageChange(data: any): void {
    const url = `${data}`;
    const res = this.http.get(url);
    res.subscribe({
      next: (response) => {
        this.data = response;
      }
    })
  }

  recargarDatosTabla() {
    this.initTable();
  }

  private initTable() {
    this.allService.indexBeneficiary().subscribe({
      next: (beneficiaries) => {
        this.beneficiaries = beneficiaries;
        this.data = this.beneficiaries;
      }, error: () => {
        this.hayError = true;
      }
    });
  }



  realizarBusqueda() {
    // this.crecheService.searchValueBeneficiary(this.searchTerm).subscribe({
    //   next: (res) => {
    //     this.data = res;
    //   }
    // })
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTermChanged.next(searchTerm);
  }

  search(value: any) {
    // this.crecheService.searchBeneficiary(value).subscribe({
    //   next: (res) => {
    //     this.data = res;
    //   }
    // })
  }

  searchChange() {
    // this.crecheService.searchBeneficiary(this.searchTerm).subscribe({
    //   next: (res) => {
    //     this.data = res;
    //   }
    // })
  }

  curp: boolean;

  validatorCurp() {

    // this.crecheService.fetchCurp(this.miFormularioService.value.curp).subscribe({
    //   next: (response) => {
    //     if (response.not) {

    //       Swal.fire({
    //         position: 'center',
    //         icon: 'error',
    //         title: 'No se encuentra la CURP',
    //         showConfirmButton: true
    //       })
    //     }
    //     if (response.id || response.nombre) {
    //       this.curp = true;
    //       this.miFormularioService.get('curp').setValue(response.curp);
    //       this.miFormularioService.get('curp').disable();

    //     }
    //   }, error: (error) => {

    //     console.log(error);
    //     this.hayError = true;
    //   }
    // })
  }

  backCurp() {

    this.curp = false;
    this.miFormularioService.get('curp').setValue("");
    this.miFormularioService.get('curp').enable();

  }

  ngOnInit(): void {
    this.allService.getCatalogs().subscribe({
      next: (catalogs) => {
        this.diseases = catalogs.enfermedad;
        this.housing = catalogs.vivienda;
      }, error: () => {
        this.hayError = true;
      }
    });
  }

  getHousingObject() {
    // Obtener el objeto correspondiente según el valor de beneficiary?.vivienda
    const housingId = this.beneficiary?.vivienda;
    return this.housing.find(housing => housing.id == housingId) || {};
  }

  getDiseasObject() {
    // Obtener el objeto correspondiente según el valor de beneficiary?.vivienda
    const diseasesId = this.beneficiary?.enfermedad;
    return this.diseases.find(diseases => diseases.id == diseasesId) || {};
  }


  changeEstatus(data: any, status: any) {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea ' + (status == 0 ? 'dar de baja' : (status == 1 ? 'dar de alta' : '')) + ' a este usuario?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.beneficiary = data;
        this.changeCreche(status);
      } else if (result.isDenied) {
        return;
      }
    })
  }

  changeCenter() {

    let body = this.beneficiary;
    body['newCenter'] = this.selectLocation;
    body['newDegree'] = this.selectDegree;
    // this.crecheService.changeBeneficiaryCenter(body).subscribe({
    //   next: (response) => {

    //   }, error: (error) => {

    //   }
    // });;
  }

  addBeneficiaryService() {

    let data = {
      curp: this.miFormularioService.value.curp
    }
    this.allService.addBeneficiaryOfService(data).subscribe({
      next: (response) => {
        if (response.code == 200) {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
          // this.changeBeneficiary.emit();
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
    });
  }

  id: any = null;
  locations: any = null;
  selectLocation: any = "";
  selectDegree: any = "";
  selectCreche: any = "";
  degrees: any = [];
  creches: any = [];
  getLocations(id: number, data: any) {

    this.beneficiary = data;
    this.getPostCode(data.colonia);
    // this.crecheService.getLocations(id).subscribe({
    //   next: (response) => {
    //     this.locations = response;
    //   }
    // })
  }

  getCreches() {
    // this.crecheService.getCreches(this.selectLocation).subscribe({
    //   next: (response) => {
    //     this.degrees = response;
    //   }
    // })
  }

  getBeneficiary(data: any) {
    this.beneficiary = data.beneficiary;
  }

  changeCreche(status: any) {

    const data = {}
    if (status == 1) {
      const form = this.selectCreche;
      const [id, capacity, name] = form.split(',');
      if (form == 0) {
        return;
      }
      var nameRoom = name;
      data['creche_id'] = id;
      data['quota'] = capacity;
      data['beneficiary_id'] = this.beneficiary.id;
    }

    data['pivote_id'] = this.beneficiary.beneficiary_creche[0].id;

    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea ' + (status == 0 ? 'dar de baja' : (status == 1 ? 'dar de alta' : '')) + ' a este usuario en la sala ' + nameRoom + ' ?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        data['status'] = status;
        // this.crecheService.updateBeneficiaryCreche(data).subscribe({
        //   next: (response) => {
        //     if (response.code == 200) {
        //       Swal.fire({
        //         position: 'center',
        //         icon: 'success',
        //         title: response.message,
        //         showConfirmButton: false,
        //         timer: 2000
        //       })
        //       this.changeBeneficiary.emit();
        //     } else {
        //       Swal.fire({
        //         position: 'center',
        //         icon: 'error',
        //         title: response.message,
        //         showConfirmButton: false,
        //         timer: 2000
        //       })
        //     }
        //   }, error: (error) => {
        //     Swal.fire("Error", "error");
        //   }
        // })
      } else if (result.isDenied) {
        return;
      }
    })
  }

  getPostCode(value: any) {

    this.allService.getPostalCodeInfo(value).subscribe({
      next: (response) => {

        if (response[0]?.id) {
          this.beneficiary.estado = response[0].estado;
          this.beneficiary.colonia = response[0].colonia;
        }
      }, error: (error) => {

        this.hayError = true;
      }
    })
  }

  calculateAge(dateOfBirth: string): string {
    const parsedDateOfBirth = parse(dateOfBirth, 'yyyy-MM-dd', new Date());
    const currentDate = new Date();
    const years = differenceInYears(currentDate, parsedDateOfBirth);
    const months = differenceInMonths(currentDate, parsedDateOfBirth) % 12;
    const days = differenceInDays(currentDate, parsedDateOfBirth) % 30;
    let ageString = '';
    if (years > 0) {
      ageString += `${years} ${years === 1 ? 'AÑO' : 'AÑOS'}`;
    }
    if (months > 0) {
      ageString += `${ageString ? ', ' : ''}${months} ${months === 1 ? 'MES' : 'MESES'}`;
    }
    if (days > 0) {
      ageString += `${ageString ? ' Y ' : ''}${days} ${days === 1 ? 'DÍA' : 'DÍAS'}`;
    }
    return ageString;
  }
}
