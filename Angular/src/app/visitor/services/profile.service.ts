import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrlAplicant: string = environment.baseUrl + '/aplicant';
  constructor(private http: HttpClient) { }

  show() {
    const url = `${this.baseUrlAplicant}/profile/show`;
    return this.http.get<any>(url);
  }

  update(data) {
    const url = `${this.baseUrlAplicant}/profile/update`;
    return this.http.put<any>(url, data);
  }

  changePassword(data: any) {
    const url = `${this.baseUrlAplicant}/profile/update/password`;
    return this.http.patch<any>(url, data);
  }

}
