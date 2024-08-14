import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private baseUrlAplicant: string = environment.baseUrl + '/aplicant';
  constructor(private http: HttpClient) { }

  storeDocument(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrlAplicant}/request/documents/store`, data, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }

  changeDocument(data, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrlAplicant}/request/documents/change/${id}`, data, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }

  storeImportantArchivement(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrlAplicant}/important-archivement/store`, data, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }

  storeJustification(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post<any>(`${this.baseUrlAplicant}/request/justification/store`, data, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error según tus necesidades
        })
      );
  }

  showJustificationType() {
    const url = `${this.baseUrlAplicant}/important-archivement/show`;
    return this.http.get<any>(url);
  }

  getDocuments(id) {
    const url = `${this.baseUrlAplicant}/request/documents/show/${id}`;
    return this.http.get<any>(url);
  }

  getImportantArchivement() {
    const url = `${this.baseUrlAplicant}/important-archivement/show`;
    return this.http.get<any>(url);
  }

  getJustification(id) {
    const url = `${this.baseUrlAplicant}/request/justification/show/${id}`;
    return this.http.get<any>(url);
  }

  deleteImportantArchivement(id) {
    const url = `${this.baseUrlAplicant}/important-archivement/delete/${id}`;
    return this.http.delete<any>(url);
  }

  deleteJustification(id) {
    const url = `${this.baseUrlAplicant}/request/justification/delete/${id}`;
    return this.http.delete<any>(url);
  }

  finishJustification(id) {
    const url = `${this.baseUrlAplicant}/request/justification/finish/${id}`;
    return this.http.get<any>(url);
  }
}