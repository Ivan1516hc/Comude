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
  data: any = [];

  constructor(private fb: FormBuilder, private allService: AllService, private http: HttpClient) {
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

  ngOnInit(): void {
    this.initTable();
  }

  changeEstatus(data: any, status: any) {

  }


  addBeneficiaryService() {

    let data = {
      curp: this.miFormularioService.value.curp
    }
    // this.allService.addBeneficiaryOfService(data).subscribe({
    //   next: (response) => {
    //     if (response.code == 200) {

    //       Swal.fire({
    //         position: 'center',
    //         icon: 'success',
    //         title: response.message,
    //         showConfirmButton: false,
    //         timer: 2000
    //       })
    //       // this.changeBeneficiary.emit();
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
    // });
  }

  id: any = null;

  getBeneficiary(data: any) {
    this.beneficiary = data.beneficiary;
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
