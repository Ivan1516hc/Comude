import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../services/all.service';
import { Subject, debounceTime } from 'rxjs';
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

  id: any = null;

  getBeneficiary(data: any) {
    this.beneficiary = data.beneficiary;
  }
}