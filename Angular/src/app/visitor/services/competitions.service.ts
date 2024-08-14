import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {
  private baseUrlAplicant: string = environment.baseUrl + '/aplicant';
  constructor(private http: HttpClient) { }

  store(data) {
    const url = `${this.baseUrlAplicant}/request/competitions/store`;
    return this.http.post<any>(url, data);
  }

  show(id) {
    const url = `${this.baseUrlAplicant}/request/competitions/show/${id}`;
    return this.http.get<any>(url);
  }

  getDataCompetition() {
    const url = `${this.baseUrlAplicant}/catalog/competition`;
    return this.http.get<any>(url);
  }

  getDataCountryStates(id) {
    const url = `${this.baseUrlAplicant}/catalog/country-state/${id}`;
    return this.http.get<any>(url);
  }

  update(data) {
    const url = `${this.baseUrlAplicant}/request/competitions/update`;
    return this.http.put<any>(url, data);
  }
}
