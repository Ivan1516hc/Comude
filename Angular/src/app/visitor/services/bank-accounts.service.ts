import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {
  private baseUrlAplicant: string = environment.baseUrl + '/aplicant';
  constructor(private http: HttpClient) { }

  storeBankAccount(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrlAplicant}/request/bank-account/store`, data, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }

  getBankAccount(id) {
    const url = `${this.baseUrlAplicant}/request/bank-account/show/${id}`;
    return this.http.get<any>(url);
  }

  updateBankAccount(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrlAplicant}/request/bank-account/update`, data, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }
}
