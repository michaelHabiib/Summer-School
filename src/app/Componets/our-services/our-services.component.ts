import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
              public _snackBar : MatSnackBar,
              public formBuilder : FormBuilder){}

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
        this.SummerEvents = result.map((event: any) => ({
          ...event,
          form: this.formBuilder.group({
            Date: ['', Validators.required],
            Color: ['', Validators.required],
            eventCode: [event.eventCode] // Assuming eventCode is a property of each event
          })
        }));
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  toggleArrowState() {
    this.arrowState = this.arrowState === 'up' ? 'down' : 'up';
  }
  AddNewResFunday (event : any){
    if(localStorage.getItem('token')){
      this.loading = true 
      console.log(event);
        let modal = {
          code: localStorage.getItem('code'),
          name : localStorage.getItem('name'),
          eventCode : event.eventCode,
          dateTime : event.form.value.Date,
          color : event.form.value.Color,
          userID : localStorage.getItem('userID'),
          isPaid: false
        }
        console.log(modal);
        
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
