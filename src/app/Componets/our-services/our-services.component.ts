import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { EventService } from 'src/app/services/event.service';
import { SignupService } from 'src/app/services/signup.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css'],
  animations: [
trigger('cardAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-20px)'
    }),
    animate('1000ms ease-out', style({
      opacity: 1,
      transform: 'none'
    }))
  ])
]),
trigger('bounce', [
  state('up', style({ transform: 'translateY(0)' })),
  state('down', style({ transform: 'translateY(20px)' })),
  transition('up <=> down', animate('200ms ease-out')),
]),
trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1000ms ease-in-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('1000ms ease-in-out', style({ opacity: 0 }))
  ])
])
  ]
})

export class OurServicesComponent implements OnInit {
  loading = false
  message  : String | undefined 
  arrowState: string = 'up';
  name! : any
  code! : any
  token : any = localStorage.getItem('token')
  isRegistered : any 
  FundayEvents :any [] = []
  SummerEvents :any [] = []
  selectedIndex! : string
  constructor(private _ReservtionService: ReservtionService,
              public _SignupService : SignupService,
              public EventService : EventService){}

  NewResForFunday = new FormGroup({
    Date: new FormControl('', [Validators.required]),
    Color: new FormControl('', [Validators.required]),
    eventCode: new FormControl
  });
  NewResForSummerClub = new FormGroup({
    color: new FormControl('', [Validators.required]),
  });
  getAllEvents(){
    this.loading = true
    this.EventService.getAllEvents().subscribe({
      next : (result) => {
        this.loading = false
        this.SummerEvents = result
        console.log(this.SummerEvents);
        console.log(this.SummerEvents[0].avaliableDates[0]);
        
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }


  toggleArrowState() {
    this.arrowState = this.arrowState === 'up' ? 'down' : 'up';
  }
  AddNewResFunday (eventCode : string){
    if(localStorage.getItem('token')){
      this.loading = true 
      if(this.NewResForFunday.status == 'VALID'){
        let modal = {
          code: localStorage.getItem('code'),
          eventCode : eventCode,
          dateTime : this.NewResForFunday.controls.Date.value,
          color : this.NewResForFunday.controls.Color.value,
          userID : localStorage.getItem('userID'),
          isPaid: false
        }
        console.log(modal);
        console.log(this.NewResForFunday.controls);
        
        
        let token = localStorage.getItem('token')
        this._ReservtionService.ReservFunday(modal, token).subscribe({
          next : (result) =>{
            this.loading = false 
            // console.log(result);
            this.message = result.message
            this.NewResForFunday.reset()
          },
          error : (err) => {
            console.log(err);
            this.message = err.error.message
            this.loading = false
          }
        })
      }else{
      }
    }else{
      Swal.fire('Please Login First ')
    }
  }

  ngOnInit() {
    this.getAllEvents()
    setInterval(() => {
      this.toggleArrowState();
    }, 1000);
    this.name = localStorage.getItem('name')
    this.code = localStorage.getItem('code')

  }
  
}
