import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { EventService } from 'src/app/services/event.service';
import { SignupService } from 'src/app/services/signup.service';

import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DisabledColors {
  [key: string]: boolean;
}

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
  disapleColors!: any[] 
  constructor(private _ReservtionService: ReservtionService,
              public _SignupService : SignupService,
              public EventService : EventService,
              public _snackBar : MatSnackBar){}

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
        let token = localStorage.getItem('token')
        this._ReservtionService.ReservFunday(modal, token).subscribe({
          next : (result) =>{
            this.openSnackBar(result.message)
            this.loading = false 
            this.NewResForFunday.reset()
          },
          error : (err) => {
            this.loading = false
            this.openSnackBar(err.error.message)
          }
        })
      }else{
      }
    }else{
      Swal.fire('Please Login First ')
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 4000, // 5 seconds
      panelClass: 'custom-snackbar',
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    });
  }

  ngOnInit() {
    let disableColorString = localStorage.getItem('disableColor');
    this.disapleColors = disableColorString ? JSON.parse(disableColorString) : [] 
    this.getAllEvents()
    setInterval(() => {
      this.toggleArrowState();
    }, 1000);
    this.name = localStorage.getItem('name')
    this.code = localStorage.getItem('code')
  }
  
}
