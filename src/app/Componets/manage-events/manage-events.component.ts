import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'src/app/services/event.service';
import { EventSummerClubComponent } from '../event-summer-club/event-summer-club.component';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit {
  // eventForm: FormGroup<EventForm>;
  fundayEvents :any [] = []
  summerEvents :any [] = []
  availableColors:any [] = []
  colors:any [] = []
  avaliableDates!: FormArray
  eventForms: any [] = [];
  currentIndex!: number;
  form!: FormGroup
  show !: boolean

  constructor(public _EventService : EventService,
             public formBuilder: FormBuilder,
             private _snackBar: MatSnackBar ){}

  ngOnInit(): void {

    this.show = true
    this.getAllEvents()
  }
  getAllEvents(){
    this._EventService.getAllEvents().subscribe({
      next : (result) => {
        this.show = true
          for(let i = 0; i < result.length; i++){
            const event = result[i];
            this.form = new FormGroup({
              name: new FormControl(event.name, Validators.required),
              details: new FormControl(event.details, Validators.required),
              price: new FormControl(event.price, Validators.required),
              eventCode : new FormControl(event.eventCode),
            });
  
            this.colors = result[i].colors
            this.avaliableDates = result[i].avaliableDates 
            this.availableColors = result[i].availableColors
            this.eventForms.push({form : this.form, colors :this.colors, avaliableDates :this.avaliableDates, availableColors : this.availableColors });
          }
          console.log(this.eventForms);
          console.log(this.eventForms[0].form.value.name);
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  updateAvabiltyOfColor(event: any, index: number){
    console.log(event.value);
    console.log(this.eventForms[index].colors);
    console.log({color : event.value});
    let indexx = this.eventForms[index].colors.findIndex((x:any) => x.color === event.value);
    this.eventForms[index].colors[indexx].avaliable = !this.eventForms[index].colors[indexx].avaliable 
    console.log(indexx);
  } 
  DeleteDate(j:number,date:any){
    console.log(date);
   let index = this.eventForms[j].avaliableDates.findIndex((x:any) => x._id === date._id)
   console.log(index);
   this.eventForms[j].avaliableDates.splice(index,1)
   
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 4000, // 5 seconds
      panelClass: 'custom-snackbar',
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    });
  }
  DeleteEvent(eventCode:number){
    console.log(eventCode);
    this._EventService.DeleteEvent(eventCode).subscribe({
      next : (result) => {
        this.openSnackBar(result.message)
      },
      error : (err) => {
        this.openSnackBar(err.error.message)
      }
    })
  }
  removeGroup(i : number, j : number){
    this.eventForms[i].availableColors.splice(j,1)
    console.log(this.eventForms[i].availableColors);
  }
  diableColor(i : number, j : number){
    this.eventForms[i].availableColors[j].avaliable = ! this.eventForms[i].availableColors[j].avaliable
    for(let y=0; y < this.eventForms[i].availableColors[j].dateTime.length; y++){
      this.eventForms[i].availableColors[j].dateTime[y].avaliable = ! this.eventForms[i].availableColors[j].dateTime[y].avaliable
    }
  }
  disableDates(j: number, i: number){
    this.eventForms[j].avaliableDates[i].avaliable = ! this.eventForms[j].avaliableDates[i].avaliable 
  }
  disableDateTime(j:number,i:number,y:number){
    this.eventForms[j].availableColors[i].dateTime[y].avaliable = ! this.eventForms[j].availableColors[i].dateTime[y].avaliable 
  }
  removeDateTime(j:number,i:number,y:number){
    this.eventForms[j].availableColors[i].dateTime.splice(y,1)
  }
  UpdateEvent(index:number){
    let modal = {
      eventCode : this.eventForms[index].form.controls.eventCode.value,
      name : this.eventForms[index].form.controls.name.value,
      price : this.eventForms[index].form.controls.price.value,
      details : this.eventForms[index].form.controls.details.value,
      colors : this.eventForms[index].colors,
      avaliableDates : this.eventForms[index].avaliableDates,
      availableColors : this.eventForms[index].availableColors
    }
    console.log(modal);
    this._EventService.UpdateEvent(modal.eventCode, modal).subscribe({
      next : (result) => {
        this.openSnackBar(result.message)
        console.log(result);
      },
      error : (err) => {
        console.log(err);
        this.openSnackBar(err.error.message)
      }
    })
  }
}
 
