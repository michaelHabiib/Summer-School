import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _HttpClient :HttpClient ) { 
  }

  AddNewEvent(modal:any):Observable<any>{
    return this._HttpClient.post(`https://sunday-school-90tv.onrender.com/api/add/event`,modal)
  }
  getAllEvents(): Observable<any>{
    return this._HttpClient.get(`https://sunday-school-90tv.onrender.com/api/add`)
  }
}
