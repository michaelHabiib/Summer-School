import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  name!: string;
  code! : any
  isRegistered! : boolean 
  isRegisteredChanged = new Subject<boolean>()
  private isRegisteredSubject = new BehaviorSubject<boolean>(false);
  isRegistered$ = this.isRegisteredSubject.asObservable();

  setIsRegistered(value: boolean) {
    this.isRegisteredSubject.next(value);
    localStorage.setItem('isRegistered', JSON.stringify(value));
  }

  constructor(private _HttpClient : HttpClient ) {
    const storedValue = localStorage.getItem('isRegistered');
    const initialValue = storedValue ? JSON.parse(storedValue) : false;
    this.setIsRegistered(initialValue); // Set the initial value of isRegistered

  }

    SignUp(modal:any):Observable<any>{
      return this._HttpClient.post('https://sunday-school-90tv.onrender.com/api/user/regstir',modal)
    }
    SignIn(modal:any):Observable<any>{
      return this._HttpClient.post('https://sunday-school-90tv.onrender.com/api/user/login',modal)
    }
    
}
