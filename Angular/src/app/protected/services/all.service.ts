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

  sendMessageJustificacion(id:number){
    const url = `${this.baseUrl}/admin/request/sendMessageJustificacion/${id}`;
    return this.http.get<any>(url);
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

  exportComite(data) {
    const url = `${this.baseUrl}/admin/export/excel-comite`;
    return this.http.post(url, data, { responseType: 'arraybuffer' });
  }

  importComite(data) {
    const url = `${this.baseUrl}/admin/import/excel-comite`;
    return this.http.post<any>(url, data);
  }

  search(value: any, start: any = null, end: any = null, exportExcel = null) {
    const url = this.baseUrl + '/admin/request/search/' + value + '/' + start + '/' + end + '/' + exportExcel;
    if (exportExcel == 1) {
      return this.http.get(url, { responseType: 'arraybuffer' });
    }
    return this.http.get<any>(url);
  }

  showHistorical(start = null, end = null, exportExcel = null) {
    if (start == '' || end == '') {
      start = null;
      end = null;
    }
    const url = `${this.baseUrl}/admin/historical/index/${start}/${end}/${exportExcel}`;
    if (exportExcel == 1) {
      return this.http.get(url, { responseType: 'arraybuffer' });
    }
    return this.http.get<any>(url)
  }

  searchValueAppresial(value: any) {
    const url = this.baseUrl + '/admin/appraisal/search-value/' + value;
    return this.http.get<any>(url);
  }

  searchValueValidation(value: any) {
    const url = this.baseUrl + '/admin/validation/search-value/' + value;
    return this.http.get<any>(url);
  }

  createUser(data: any) {
    const url = `${this.baseUrl}/admin/catalog/user/create`;
    return this.http.post<any>(url, data);
  }

  updateUser(data: any) {
    const url = `${this.baseUrl}/admin/catalog/user/update`;
    return this.http.put<any>(url, data);
  }

  deleteUser(id: number) {
    const url = `${this.baseUrl}/admin/catalog/user/delete/${id}`;
    return this.http.delete<any>(url);
  }

  restoreUser(id: number) {
    const url = `${this.baseUrl}/admin/catalog/user/restore/${id}`;
    return this.http.delete<any>(url);
  }

  getUsers() {
    const url = `${this.baseUrl}/admin/catalog/user/index`;
    return this.http.get<any>(url);
  }

  createDiscipline(data: any) {
    const url = `${this.baseUrl}/admin/catalog/discipline/create`;
    return this.http.post<any>(url, data);
  }

  updateDiscipline(data: any) {
    const url = `${this.baseUrl}/admin/catalog/discipline/update`;
    return this.http.put<any>(url, data);
  }

  deleteDisciplines(id: number) {
    const url = `${this.baseUrl}/admin/catalog/discipline/delete/${id}`;
    return this.http.delete<any>(url);
  }

  restoreDisciplines(id: number) {
    const url = `${this.baseUrl}/admin/catalog/discipline/restore/${id}`;
    return this.http.delete<any>(url);
  }

  getDiscipline() {
    const url = `${this.baseUrl}/admin/catalog/discipline/index`;
    return this.http.get<any>(url);
  }

  getDataUser() {
    const url = `${this.baseUrl}/admin/catalog/user/data`;
    return this.http.get<any>(url);
  }

  createJustification(data: any) {
    const url = `${this.baseUrl}/admin/catalog/justification/create`;
    return this.http.post<any>(url, data);
  }

  updateJustification(data: any) {
    const url = `${this.baseUrl}/admin/catalog/justification/update`;
    return this.http.put<any>(url, data);
  }

  deleteJustification(id: number) {
    const url = `${this.baseUrl}/admin/catalog/justification/delete/${id}`;
    return this.http.delete<any>(url);
  }

  restoreJustification(id: number) {
    const url = `${this.baseUrl}/admin/catalog/justification/restore/${id}`;
    return this.http.delete<any>(url);
  }

  getJustifications() {
    const url = `${this.baseUrl}/admin/catalog/justification/index`;
    return this.http.get<any>(url);
  }

  createDocument(data: any) {
    const url = `${this.baseUrl}/admin/catalog/document/create`;
    return this.http.post<any>(url, data);
  }

  updateDocument(data: any) {
    const url = `${this.baseUrl}/admin/catalog/document/update`;
    return this.http.put<any>(url, data);
  }

  deleteDocument(id: number) {
    const url = `${this.baseUrl}/admin/catalog/document/delete/${id}`;
    return this.http.delete<any>(url);
  }

  restoreDocument(id: number) {
    const url = `${this.baseUrl}/admin/catalog/document/restore/${id}`;
    return this.http.delete<any>(url);
  }

  getDocuments() {
    const url = `${this.baseUrl}/admin/catalog/document/index`;
    return this.http.get<any>(url);
  }

  getCountRequest(status: number, id: number) {
    const url = `${this.baseUrl}/admin/dashboard/count-request/${status}/${id}`;
    return this.http.get<any>(url);
  }

  getCountBeneficiary(id: number) {
    const url = `${this.baseUrl}/admin/dashboard/count-beneficiary/${id}`;
    return this.http.get<any>(url);
  }

  getHistoryMessages() {
    const url = `${this.baseUrl}/admin/dashboard/history-messages`;
    return this.http.get<any>(url);
  }
}
