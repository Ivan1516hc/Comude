import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestsResponse } from '../interfaces/request-aplicant';

@Injectable({
  providedIn: 'root'
})
export class AllVisitorService {
  private baseUrl: string = environment.baseUrl;
  private procedure: string;
  private center: string;
  private room: string;
  private job_position: string;
  private dependence_id: string;
  private employee_number: string;

  constructor(private http: HttpClient) { }

  setSelections(procedure: string, job_position: string, dependence_id: string,
    employee_number: string) {
    this.procedure = procedure;
    // this.center = center;
    // this.room = room;
    this.job_position = job_position
    this.dependence_id = dependence_id
    this.employee_number = employee_number
  }

  // Resto del código del servicio...
  clearProcedure() {
    this.procedure = null;
  }

  clearCenter() {
    this.center = null;
  }

  clearRoom() {
    this.room = null;
  }

  clearJob_position() {
    this.job_position = null;
  }

  clearDependence_id() {
    this.dependence_id = null;
  }

  clearEmployee_number() {
    this.employee_number = null;
  }

  getProcedure(): string {
    return this.procedure;
  }

  getCenter(): string {
    return this.center;
  }

  getRoom(): string {
    return this.room;
  }

  getJob_position(): string {
    return this.job_position;
  }

  getDependence_id(): string {
    return this.dependence_id;
  }

  getEmployee_number(): string {
    return this.employee_number;
  }

  changePassword(data: any) {
    const url = `${this.baseUrl}/request/aplicant/update/password`;
    return this.http.patch<any>(url, data);
  }

  indexRequestVisitor(): Observable<RequestsResponse> {
    const url = `${this.baseUrl}/visitor/request`;
    return this.http.get<RequestsResponse>(url);
  }

  showBeneficiaryVisitor(id: number): Observable<any> {
    const url = `${this.baseUrl}/beneficiary/` + id;
    return this.http.get<any>(url);
  }

  showParentsVisitor(id: number): Observable<any> {
    const url = `${this.baseUrl}/request/parents/document/` + id;
    return this.http.get<any>(url);
  }

  showParents(id: number): Observable<any> {
    const url = `${this.baseUrl}/request/parents/` + id;
    return this.http.get<any>(url);
  }


  showHousingVisitor(id: number): Observable<any> {
    const url = `${this.baseUrl}/request/housing/show/` + id;
    return this.http.get<any>(url);
  }

  showReferencesVisitor(id: number): Observable<any> {
    const url = `${this.baseUrl}/request/references/show/` + id;
    return this.http.get<any>(url);
  }

  getBeneficiariesRequest(id: number): Observable<any> {
    const url = `${this.baseUrl}/request/beneficiary/` + id;
    return this.http.get<any>(url);
  }

  getAddressRequest(id: number): Observable<any> {
    const url = `${this.baseUrl}/request/address/` + id;
    return this.http.get<any>(url);
  }

  getDocumentsProcedure(id: number): Observable<any> {
    const url = `${this.baseUrl}/request/beneficiary/` + id;
    return this.http.get<any>(url);
  }

  createHousingRequest(data: any) {
    const url = `${this.baseUrl}/request/housing/create`;
    return this.http.post<any>(url, data);
  }

  createReferencesRequest(data: any) {
    const url = `${this.baseUrl}/request/references/create`;
    return this.http.post<any>(url, data);
  }

  changeStatusRequest(data: any) {
    const url = `${this.baseUrl}/request/update/status`;
    return this.http.post<any>(url, data);
  }

  showRequest(id: number): Observable<any> {
    const url = `${this.baseUrl}/request/show/` + id;
    return this.http.get<any>(url);
  }
  
  uploadFileWithFormData(formData: FormData) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrl}/beneficiary/upload`, formData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }

  uploadFileWithFormDataCisz(formData: FormData) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrl}/beneficiary/upload/cisz`, formData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }

  storeRequest(data){
    const url = `${this.baseUrl}/request/create`;
    return this.http.post<any>(url,data);
  }

  getDataDiscipline(){
    const url = `${this.baseUrl}/catalog/discipline`;
    return this.http.get<any>(url);
  }

  getDataCompetition(){
    const url = `${this.baseUrl}/catalog/competition`;
    return this.http.get<any>(url);
  }

  getDataCountryStates(id){
    const url = `${this.baseUrl}/catalog/country-state/${id}`;
    return this.http.get<any>(url);
  }

  storeCompetition(data){
    const url = `${this.baseUrl}/request/competitions/store`;
    return this.http.post<any>(url, data);
  }

  getCompetition(id){
    const url = `${this.baseUrl}/request/competitions/show/${id}`;
    return this.http.get<any>(url);
  }

  storeBankAccount(data){
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrl}/request/bank-account/store`, data, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }

  storeImportantArchivement(data){
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrl}/request/important-archivement/store`, data, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }

  getImportantArchivement(){
    const url = `${this.baseUrl}/request/important-archivement/show`;
    return this.http.get<any>(url);
  }

  deleteImportantArchivement(id){
    const url = `${this.baseUrl}/request/important-archivement/delete/${id}`;
    return this.http.delete<any>(url);
  }

  getBankAccount(id){
    const url = `${this.baseUrl}/request/bank-account/show/${id}`;
    return this.http.get<any>(url);
  }

  storeDocument(data){
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrl}/request/documents/store`, data, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }

  getDocuments(id){
    const url = `${this.baseUrl}/request/documents/show/${id}`;
    return this.http.get<any>(url);
  }

  getInfo(){
    const url = `${this.baseUrl}/request/aplicant/show`;
    return this.http.get<any>(url);
  }

  updateInfo(data){
    const url = `${this.baseUrl}/request/aplicant/update`;
    return this.http.put<any>(url,data);
  }
}
