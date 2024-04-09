import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


import { AuthResponse, Usuario, Validate } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string=environment.baseUrl;
  private _usuario!:Usuario;

  get usuario(){
    return {...this._usuario}
  }

  constructor(private http:HttpClient) { }

  login(email:string, password:string){

    const url =`${this.baseUrl}/auth/login`
    const body={email, password}

    return this.http.post<AuthResponse>(url,body).pipe(
      tap(response =>{
        if (response.token){
          localStorage.setItem('token',response.token!);
          localStorage.setItem('status',response.id!)
          this._usuario={
            name:response.name!
          }
        }
      }),
      map(response => response),
      catchError(err=>of(err)),
    )
  }

  validarToken():Observable<boolean>{
    const url=`${this.baseUrl}/auth/validate`;
    const headers=new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token')||'');
    return this.http.get<Validate>(url,{headers}).pipe(
      map(response=>{
        if(response.type){
          return response.ok;
        }
        return false;
      }),
      catchError(err=>of(false))
    )
  }

  validarAdmin():Observable<boolean>{
    const url=`${this.baseUrl}/auth/validateUserAdmin`;
    const headers=new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token')||'');
    return this.http.get<Validate>(url,{headers}).pipe(
      map(response=>{
        return response.ok;
      }),
      catchError(err=>of(false))
    )
  }

  validarVisitor():Observable<boolean>{
    const url=`${this.baseUrl}/auth/validateUserVisitor`;
    const headers=new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token')||'');
    return this.http.get<Validate>(url,{headers}).pipe(
      map(response=>{
        return response.ok;
      }),
      catchError(err=>of(false))
    )
  }

  sendResetMenssage(data:any){
    const url=`${this.baseUrl}/password/reset`;
    return this.http.post<any>(url,data);
  }

  resetPassword(data:any, token:string){
    const url=`${this.baseUrl}/auth/password/reset/${token}`;
    return this.http.post<any>(url,data);
  }

  register(data:any){
    const url=`${this.baseUrl}/auth/register`;
    return this.http.post<any>(url,data);
  }

  resendVerificationEmail(email:string){
    const url=`${this.baseUrl}/send/verification/${email}`;
    return this.http.get<any>(url);
  }

  verificationEmail(data:any,email:string){
    const body=data;
    const url=`${this.baseUrl}/verify/email/${email}`;
    return this.http.post<any>(url,body);
  }

  logOut(data:any){
    const body=data;
    const url=`${this.baseUrl}/auth/logout`;
    return this.http.post<any>(url,body);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/user`);
  }

  isAuthenticated(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/authenticated`);
  }
}
