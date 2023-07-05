import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  name!: string;
  code! : number
  isRegstired : boolean = false
  isRegisterdChanged = new Subject<boolean>()

  setIsRegisterd (value:boolean) {
    this.isRegstired =  value
    this.isRegisterdChanged.next(value)
  }

  constructor(private _HttpClient : HttpClient ) { }

    SignUp(modal:any):Observable<any>{
      return this._HttpClient.post('https://sunday-school-90tv.onrender.com/api/user/regstir',modal)
    }
    SignIn(modal:any):Observable<any>{
      return this._HttpClient.post('https://sunday-school-90tv.onrender.com/api/user/login',modal)
    }
    
}
