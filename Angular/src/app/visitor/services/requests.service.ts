import { Injectable } from '@angular/core';
import { RequestsResponse } from '../interfaces/request-aplicant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrlAplicant: string = environment.baseUrl + '/aplicant';
  constructor(private http: HttpClient) { }

  getAll(): Observable<RequestsResponse> {
    const url = `${this.baseUrlAplicant}/request`;
    return this.http.get<RequestsResponse>(url);
  }

  store(data) {
    const url = `${this.baseUrlAplicant}/request/create`;
    return this.http.post<any>(url, data);
  }

  show(id: number): Observable<any> {
    const url = `${this.baseUrlAplicant}/request/show/` + id;
    return this.http.get<any>(url);
  }

  readRegulations() {
    const url = `${this.baseUrlAplicant}/read-regulations`;
    return this.http.get<any>(url);
  }

  changeStatusRequest(data: any) {
    const url = `${this.baseUrlAplicant}/request/update/status`;
    return this.http.post<any>(url, data);
  }

  getDataDiscipline() {
    const url = `${this.baseUrlAplicant}/catalog/discipline`;
    return this.http.get<any>(url);
  }

  verifyRequest(id: number, form: number) {
    const url = `${this.baseUrlAplicant}/request/verify/update/${id}/${form}`;
    return this.http.get<any>(url);
  }

  verifyRequestDocuments(id: number) {
    const url = `${this.baseUrlAplicant}/request/verify/update/documents/${id}`;
    return this.http.get<any>(url);
  }
}
