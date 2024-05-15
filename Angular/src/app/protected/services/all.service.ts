import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Requests } from '../interfaces/requests-interface';

@Injectable({
  providedIn: 'root'
})
export class AllService {
  private baseUrl: string = environment.baseUrl;
  private baseUrlDataC: string = 'https://datac.difzapopan.gob.mx/api-servicios/public/api';

  constructor(private http: HttpClient) { }

  indexRequest(): Observable<Requests> {
    const url = `${this.baseUrl}/request`;
    return this.http.get<Requests>(url);
  }

  indexBeneficiary(): Observable<any> {
    const url = `${this.baseUrl}/admin/beneficiary/index`;
    return this.http.get<any>(url);
  }

  updateRequest(data: any) {
    const url = `${this.baseUrl}/admin/request/update`
    return this.http.put<any>(url, data);
  }

  getFormData(id: number): Observable<any> {
    const url = this.baseUrl + '/admin/request/formData/' + id;
    return this.http.get<any>(url);
  }

  getForms(): Observable<any> {
    const url = this.baseUrl + '/admin/request/message/form';
    return this.http.get<any>(url);
  }

  historyMessage(id: any) {
    const url = `${this.baseUrl}/admin/request/message/${id}/history`;
    return this.http.get<any>(url)
  }

  sendMessageToRequest(data) {
    const url = `${this.baseUrl}/admin/request/message/create`;
    return this.http.post<any>(url, data)
  }

  showAppraisal() {
    const url = `${this.baseUrl}/admin/appraisal/index`;
    return this.http.get<any>(url)
  }

  assignmentComite(data) {
    const url = `${this.baseUrl}/admin/appraisal/approved-budget`;
    return this.http.post<any>(url, data)
  }

  // exportComite(data) {
  //   const url = `${this.baseUrl}/admin/export/excel-comite`;
  //   return this.http.post(url, data, { responseType: 'arraybuffer' });
  // }

  exportComite(data: any): Observable<{ code: number, message: string }> {
    const url = `${this.baseUrl}/admin/export/excel-comite`;
    return this.http.post(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response', // Para obtener la respuesta completa
      responseType: 'arraybuffer' // Indicar que esperamos un arraybuffer como respuesta
    }).pipe(
      map((response: HttpResponse<ArrayBuffer>) => {
        return { code: response.status, message: 'Success' };
      }),
      catchError(error => {
        return of({ code: error.code, message: 'Error downloading the Excel file' });
      })
    );
  }

  importComite(data) {
    const url = `${this.baseUrl}/admin/import/excel-comite`;
    return this.http.post<any>(url, data);
  }

  search(value: any) {
    const url = this.baseUrl + '/admin/request/search/' + value;
    return this.http.get<any>(url);
  }
  searchValueAppresial(value: any) {
    const url = this.baseUrl + '/admin/appraisal/search-value/' + value;
    return this.http.get<any>(url);
  }

  searchValueValidation(value: any) {
    const url = this.baseUrl + '/admin/validation/search-value/' + value;
    return this.http.get<any>(url);
  }

}
