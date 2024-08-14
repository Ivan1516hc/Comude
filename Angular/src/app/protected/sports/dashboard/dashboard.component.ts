import { Component } from '@angular/core';
import { AllService } from '../../services/all.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private allService: AllService, private http: HttpClient) { }
  dataValidation: number;
  dataAppraisal: number;
  dataBeneficiary: number;
  dataHistoryMessage: any;
  typeValidation : number;
  typeAppraisal: number;
  typeBeneficiary: number;
  headers = ['No.', 'Acción', 'Mensaje'];
  ngOnInit() {
    this.initCards();
  }

  initCards() {
    this.getCountRequestValidation(3);
    this.getCountRequestAppraisal(3);
    this.getCountBeneficiary(3);
    this.getHistoryMessage();
  }

  getCountRequestValidation(idDate: number) {
    this.typeValidation = idDate;
    this.allService.getCountRequest(2, idDate).subscribe((data) => {
      this.dataValidation = data;
    });
  }

  getCountRequestAppraisal(idDate: number) {
    this.typeAppraisal = idDate;
    this.allService.getCountRequest(3, idDate).subscribe((data) => {
      this.dataAppraisal = data;
    });
  }

  getCountBeneficiary(id: number) {
    this.typeBeneficiary = id;
    this.allService.getCountBeneficiary(id).subscribe((data) => {
      this.dataBeneficiary = data;
    });
  }

  getHistoryMessage() {
    this.allService.getHistoryMessages().subscribe((data) => {
      this.dataHistoryMessage = data;
    });
  }

  // Función para manejar el cambio de página
  onPageChange(data: any): void {
    const url = `${data}`;
    const res = this.http.get(url);
    res.subscribe({
      next: (response) => {
        this.dataHistoryMessage = response;
      }
    })
  }
}
