import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrecheService {
  private baseUrl: string = environment.baseUrl;
  private baseUrlDataC: string = 'https://datac.difzapopan.gob.mx/api-servicios/public/api';

  constructor(private http: HttpClient) { }

  indexCreche(): Observable<any> {
    const url = `${this.baseUrl}/creche`;
    return this.http.get<any>(url);
  }

  // indexDegree(): Observable<any> {
  //   const url = `${this.baseUrl}/degree`;
  //   return this.http.get<any>(url);
  // }

  requestCreche(data: any): Observable<any> {
    const url = `${this.baseUrl}/creche/request/` + data;
    return this.http.get<any>(url);
  }

  createBeneficiaryCreche(data: any) {
    const url = `${this.baseUrl}/creche/beneficiary/create`;
    const body = JSON.stringify(data);
    return this.http.post<any>(url, data)
  }

  updateBeneficiaryCreche(data: any) {
    const url = `${this.baseUrl}/creche/beneficiary/update`;
    return this.http.put<any>(url, data);
  }

  showBeneficiaryCreche(creche_id: number) {
    const url = `${this.baseUrl}/creche/beneficiaries/` + creche_id;
    return this.http.get<any>(url)
  }

  downloadPdf(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'responseType': 'blob'
    });

    return this.http.get(`${this.baseUrl}/creche/generar-pdf/` + id, {
      headers: headers,
      responseType: 'blob' as 'json' // This is required for the responseType
    });
  }

  downloadCiszPdf(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'responseType': 'blob'
    });

    return this.http.get(`${this.baseUrl}/creche/generar-cisz-pdf/` + id, {
      headers: headers,
      responseType: 'blob' as 'json' // This is required for the responseType
    });
  }

  getLocations(id: number): Observable<any> {
    const url = this.baseUrl + '/center/procedure/' + id;
    return this.http.get<any>(url);
  }

  getCreches(id: number): Observable<any> {
    const url = this.baseUrl + '/center/creche/' + id;
    return this.http.get<any>(url);
  }

  changeCenter(data: any) {
    const url = `${this.baseUrl}/request/changecenter`;
    const body = JSON.stringify(data);
    return this.http.post<any>(url, body)
  }

  changeBeneficiaryCenter(data: any) {
    const url = `${this.baseUrl}/beneficiary/change/center`;
    const body = JSON.stringify(data);
    return this.http.post<any>(url, body)
  }

  fetchCurp(curp: any): Observable<any> {
    const value = curp;

    return this.http.get<any>(this.baseUrlDataC + '/1111112022/get/curp/' + value)
      .pipe(
        switchMap(response => {
          if (Array.isArray(response) && response.length > 0 && response[0] === 'ok') {
            return of({
              ...response[1]
            });
          } else {
            return this.http.get<any>(this.baseUrlDataC + '/1111112022/validarCurp/' + value)
              .pipe(
                map(newResponse => {
                  if (newResponse[1] !== 'NO EXITOSO') {
                    let date = newResponse[5].split('/').reverse().join('-');
                    return {
                      apaterno: newResponse[2],
                      amaterno: newResponse[3],
                      curp: newResponse[0],
                      nombre: newResponse[1],
                      fechanacimiento: date,
                      sexo: newResponse[4] == "H" ? 1 : 2,
                    };
                  } else {
                    return {
                      not: 'CURP no encontrada.',
                    };
                  }
                })
              );
          }
        })
      );
  }

  search(value:any){
    const url = this.baseUrl + '/request/search/' + value;
    return this.http.get<any>(url);
  }
  searchValue(value:any){
    const url = this.baseUrl + '/request/search-value/' + value;
    return this.http.get<any>(url);
  }

  searchQuote(value:any){
    const url = this.baseUrl + '/quote/search/' + value;
    return this.http.get<any>(url);
  }
  searchValueQuote(value:any){
    const url = this.baseUrl + '/quote/search-value/' + value;
    return this.http.get<any>(url);
  }

  searchBeneficiary(value:any){
    const url = this.baseUrl + '/beneficiary/search/' + value;
    return this.http.get<any>(url);
  }
  
  searchValueBeneficiary(value:any){
    const url = this.baseUrl + '/beneficiary/search-value/' + value;
    return this.http.get<any>(url);
  }

  getDegreeRoom(){
    const url = this.baseUrl + '/beneficiary/degree-room';
    return this.http.get<any>(url);
  }
}
