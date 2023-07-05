import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { SignupService } from 'src/app/services/signup.service';
// import { DialogComponent } from '../dialog/dialog.component';
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
  state('down', style({ transform: 'translateY(5px)' })),
  transition('up <=> down', animate('100ms ease-out')),
])
  ]
})

export class OurServicesComponent implements OnInit {
  loading = false
  message  : String | undefined 
  arrowState: string = 'up';
  name! : any
  code! : any
  // userID!: any
  // isPaid : boolean = false

  constructor(private _ReservtionService: ReservtionService,
     private _SignupService : SignupService){}

  NewResForFunday = new FormGroup({
    CodeForm: new FormControl('', [Validators.required]),
    ColorGroup: new FormControl('', [Validators.required]),
  });


  toggleArrowState() {
    this.arrowState = this.arrowState === 'up' ? 'down' : 'up';
  }
  AddNewResFunday (){
    this.loading = true 
    if(this.NewResForFunday.status == 'VALID'){
      let modal = {
        code : this.NewResForFunday.controls.CodeForm.value,
        color : this.NewResForFunday.controls.ColorGroup.value,
        userID : localStorage.getItem('userID'),
        isPaid: false
      }
      let token = localStorage.getItem('token')
      this._ReservtionService.ReservFunday(modal, token).subscribe({
        next : (result) =>{
          this.loading = false 
          console.log(result);
          this.message = result.message
          this.NewResForFunday.reset()
        },
        error : (err) => {
          console.log(err);
          this.message = err.error.message
          console.log(this.message);
          this.loading = false
        }
      })
      console.log(this.NewResForFunday);
      
    }else{

    }
  }
  splitFirstNameOfUser(name:string){
    const totalName = name.split(' ')
    return totalName[0]
  }

  ngOnInit() {
    setInterval(() => {
      this.toggleArrowState();
    }, 1000);
    this.name = localStorage.getItem('name')
    this.code = localStorage.getItem('code')
  }
}
