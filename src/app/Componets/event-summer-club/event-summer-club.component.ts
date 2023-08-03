import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-event-summer-club',
  templateUrl: './event-summer-club.component.html',
  styleUrls: ['./event-summer-club.component.css']
})
export class EventSummerClubComponent  {
  constructor(private formBuilder: FormBuilder,
              public _EventService: EventService,
              private _snackBar: MatSnackBar){
    this.addNewEvent = this.formBuilder.group({
      eventName: new FormControl('', Validators.required),
      eventPrice: new FormControl('', Validators.required),
      eventDetails: new FormControl('', Validators.required),
      gg : this.formBuilder.group({
        availableColors: new FormArray([
          this.formBuilder.group({
            color: new FormControl('', Validators.required),
            dateTime:new FormArray([
              this.formBuilder.group({
                date: new FormControl('', Validators.required),
                time: new FormControl('', Validators.required),
              })
            ])
          })
        ])
      })
    })
  }
  show = true;
  message: string = ''
  loading : boolean = false
  color! :string
  addNewEvent!: FormGroup

  ngOnInit() { }

  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 4000, // 5 seconds
      panelClass: 'custom-snackbar',
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    });
  }
  availableColors(): FormArray {
    return this.addNewEvent.get("gg")?.get("availableColors") as FormArray
  }
  NewColor(): FormGroup {
    return this.formBuilder.group({
      color: '',
      dateTime:this.formBuilder.array([])
    })
  }
  addColor() {
    console.log(this.addNewEvent.get('availableColors'));
    this.availableColors().push(this.NewColor());
  }
  removeColor(empIndex:number) {
    this.availableColors().removeAt(empIndex);
  }
  dateTime(empIndex:number) : FormArray {
    return this.availableColors().at(empIndex).get("dateTime") as FormArray
  }
  newDateTime(): FormGroup {
    return this.formBuilder.group({
      date: '',
      time: '',
    })
  }
  addDateTime(empIndex:number) {
    this.dateTime(empIndex).push(this.newDateTime());
  }
  removeDateTime(empIndex:number,skillIndex:number) {
    this.dateTime(empIndex).removeAt(skillIndex);
  }
  confirm() { 
    this.show = !this.show
  }
  createEvent(){
    this.loading = true
    let modal = {
      name : this.addNewEvent.value.eventName,
      details : this.addNewEvent.value.eventDetails,
      price : this.addNewEvent.value.eventPrice,
      availableColors : this.addNewEvent.value.gg.availableColors
    }
    this._EventService.AddNewEvent(modal).subscribe({
      next : (result) => {
        this.addNewEvent.reset()
        this.loading = false
        this.openSnackBar(result.message)
      },
      error : (err) => {
        this.openSnackBar(err.error.message)
      }
    })
  }
}
