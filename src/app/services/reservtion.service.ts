import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ReservtionService {


  constructor(private _HttpClient :HttpClient ) { }
  selectedValue : string = ''
  selectedValueChanged = new Subject<string>();
  weeks = [
    {
      title: 'june',
      date: 'June 01-30',
      groups: [
        {
          title: 'blue',
          times :['Monday: 10am-1pm', 'Tuesday: 2pm-5pm', 'Wednesday: 10am-1pm', 'Thursday: 2pm-5pm', 'Friday: 10am-1pm']        },
        {
          title: 'green',
          times: ['Monday: 8am-11am', 'Tuesday: 12pm-3pm', 'Wednesday: 8am-11am', 'Thursday: 12pm-3pm', 'Friday: 8am-11am']
        },
        {
          title: 'red',
          times: ['Monday: 11am-2pm', 'Tuesday: 3pm-6pm', 'Wednesday: 11am-2pm', 'Thursday: 3pm-6pm', 'Friday: 11am-2pm']
        },
        {
          title: 'brown',
          times: ['Monday: 1pm-4pm', 'Tuesday: 9am-12pm', 'Wednesday: 1pm-4pm', 'Thursday: 9am-12pm', 'Friday: 1pm-4pm']
        },
        {
          title: 'black',
          times: ['Monday: 12pm-3pm', 'Tuesday: 4pm-7pm', 'Wednesday: 12pm-3pm', 'Thursday: 4pm-7pm', 'Friday: 12pm-3pm']
        }
      ]
    },
    {
      title: 'july',
      date: 'July 01-30',
      groups: [
        {
          title: 'blue',
          times :['Monday: 9am-12pm', 'Tuesday: 1pm-4pm', 'Wednesday: 9am-12pm', 'Thursday: 1pm-4pm', 'Friday: 9am-12pm']
        },
        {
          title: 'Green',
          times:['Monday: 10am-1pm', 'Tuesday: 2pm-5pm', 'Wednesday: 10am-1pm', 'Thursday: 2pm-5pm', 'Friday: 10am-1pm']
        },
        {
          title: 'red ',
          times: ['Monday: 3pm-6pm', 'Tuesday: 10am-1pm', 'Wednesday: 3pm-6pm', 'Thursday: 10am-1pm', 'Friday: 3pm-6pm']
        },
        {
          title: 'brown',
          times: ['Monday: 11am-2pm', 'Tuesday: 3pm-6pm', 'Wednesday: 11am-2pm', 'Thursday: 3pm-6pm', 'Friday: 11am-2pm']
        },
        {
          title: 'black',
          times: ['Monday: 7am-10am', 'Tuesday: 1pm-4pm', 'Wednesday: 7am-10am', 'Thursday: 1pm-4pm', 'Friday: 7am-10am']
        }
      ]
    },
    {
      title: 'august',
      date: 'August 01-30',
      groups: [
        {
          title: 'blue',
          times :['Monday: 12pm-3pm', 'Tuesday: 9am-12pm', 'Wednesday: 12pm-3pm', 'Thursday: 9am-12pm', 'Friday: 12pm-3pm'] 
        },
        {
          title: 'Green',
          times: ['Monday: 6am-9am', 'Tuesday: 5pm-8pm', 'Wednesday: 6am-9am', 'Thursday: 5pm-8pm', 'Friday: 6am-9am']
        },
        {
          title: 'red',
          times: ['Monday: 8am-11am', 'Tuesday: 2pm-5pm', 'Wednesday: 8am-11am', 'Thursday: 2pm-5pm', 'Friday: 8am-11am']
        },
        {
          title: 'brown',
          times: ['Monday: 9am-12pm', 'Tuesday: 1pm-4pm', 'Wednesday: 9am-12pm', 'Thursday: 1pm-4pm', 'Friday: 9am-12pm']
        },
        {
          title: 'black',
          times: ['Monday: 12pm-3pm', 'Tuesday: 4pm-7pm', 'Wednesday: 12pm-3pm', 'Thursday: 4pm-7pm', 'Friday: 12pm-3pm']
        }
      ]
    }
  ]
  setSelectedValue(value: string) {
    this.selectedValue = value
    // console.log(selectedValue);
    this.selectedValueChanged.next(value);    
  }
  ReservFunday(modal:any, token: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `${token}`
      })
    };
    // console.log(localStorage.getItem('token'));  
    return this._HttpClient.post('https://sunday-school-90tv.onrender.com/api/events/funday',modal,httpOptions)
  }
  ReservNady(modal:any, token: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `${token}`
      })
    };
    // console.log(localStorage.getItem('token'));  
    return this._HttpClient.post('https://sunday-school-90tv.onrender.com/api/events/nady',modal,httpOptions)
  }
  GetUsersByYear(year: any): Observable<any>{
    return this._HttpClient.get(`https://sunday-school-90tv.onrender.com/api/user/year/${year}`)
  }
  GetAttOfDay(Day:any, kidClass:any):Observable<any>{
    return this._HttpClient.get(`https://sunday-school-90tv.onrender.com/api/Att/${Day}/${kidClass}`)
  }
  SaveAttendance(modal:any):Observable<any>{
    return this._HttpClient.post(`https://sunday-school-90tv.onrender.com/api/Att`,modal)
  }

  GetAllFundayReservtions ():Observable<any> {
    return this._HttpClient.get(`https://sunday-school-90tv.onrender.com/api/events/funday`)
  }
  UpdateCashReservtion (modal: any, id: any):Observable<any>{
    return this._HttpClient.put(`https://sunday-school-90tv.onrender.com/api/events/funday/update/${id}`,modal)
  }

}
