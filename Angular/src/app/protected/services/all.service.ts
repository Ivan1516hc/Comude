import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  createRequest(data:any){
    const url =`${this.baseUrl}/request/create`;
    const body=JSON.stringify(data);
     return this.http.post<any>(url,body)
  }

  updateRequest(data:any){
    const url=`${this.baseUrl}/request/update`
    return this.http.put<any>(url,data);
  }

  indexQuote(): Observable<any> {
    const url = `${this.baseUrl}/quote`;
    return this.http.get<any>(url);
  }

  updateQuote(data:any){
    const url=`${this.baseUrl}/quote/update`
    return this.http.put<any>(url,data);
  }

  createQuote(data:any){
    const url =`${this.baseUrl}/quote/create`;
    // const body=JSON.stringify(data);
     return this.http.post<any>(url,data)
  }

  indexBeneficiary(): Observable<any> {
    const url = `${this.baseUrl}/beneficiary`;
    return this.http.get<any>(url);
  }

  getPostalCodeInfo(value: number) {
    const url = this.baseUrlDataC + '/data/colonias/' + value;
    return this.http.get<any>(url);
  }

  getCatalogs(): Observable<any> {
    const url = this.baseUrlDataC + '/data/catalogos';
    return this.http.get<any>(url);
  }

  getFormData(id:number): Observable<any> {
    const url = this.baseUrl + '/request/formData/'+id;
    return this.http.get<any>(url);
  }

  getForms(): Observable<any> {
    const url = this.baseUrl + '/request/message/form';
    return this.http.get<any>(url);
  }

  addBeneficiaryService(data:any){
    const url =`${this.baseUrl}/service/beneficiary/create`;
    const body=JSON.stringify(data);
     return this.http.post<any>(url,data)
  }

  addBeneficiaryOfService(data:any){
    const url =`${this.baseUrl}/service/beneficiary/createofservice`;
    // const body=JSON.stringify(data);
     return this.http.post<any>(url,data)
  }

  historyMessage(id:any){
    const url =`${this.baseUrl}/request/message/${id}/history`;
     return this.http.get<any>(url)
  }

  sendMessageToRequest(data){
    const url =`${this.baseUrl}/request/message/create`;
     return this.http.post<any>(url,data)
  }


}
