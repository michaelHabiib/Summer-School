import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-funday-event',
  templateUrl: './funday-event.component.html',
  styleUrls: ['./funday-event.component.css']
})
export class FundayEventComponent {
  constructor(private formBuilder: FormBuilder, public _EventService: EventService){}
  
  AddNewEvent = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    price : new FormControl('', [Validators.required]),
    details : new FormControl('', Validators.required),
    red : new FormControl(null,),
    black : new FormControl(null,),
    purble : new FormControl(null,),
    yellow : new FormControl(null,),
    green : new FormControl(null,),
    brown : new FormControl(null,),
    rose : new FormControl(null,),
    gray : new FormControl(null,),
    blue : new FormControl(null,),
    dates : this.formBuilder.array([])
  }) 
  loading :boolean = false
  message : string = ''
  show: boolean = true
  eventName! : string
  eventPrice! : number
  eventDetails!: string
  colors: string[] = []

  get dates() : FormArray{
    return this.AddNewEvent.controls["dates"] as FormArray;
  }

newDate(): FormGroup {
    return this.formBuilder.group({
    date: ['', Validators.required],
    time: ['', Validators.required]
  });
}
addDate(){
  const dateForm = this.formBuilder.group({
    date: ['', Validators.required],
    time: ['', Validators.required]
  })
  this.dates.push(dateForm)
}
removeDate(index: number) {
  this.dates.removeAt(index);
}

createEvent(){
  this.loading = true
  let modal = {
    name: this.AddNewEvent.controls.name.value,
    price: this.AddNewEvent.controls.price.value,
    details: this.AddNewEvent.controls.details.value,
    color: this.colors,
    avaliableDates:this.AddNewEvent.controls.dates.value
  }
  console.log(modal);
  this._EventService.AddNewEvent(modal).subscribe({
    next : (result) => {
      this.loading = false
      console.log(result);
      this.message = result.message
      this.AddNewEvent.reset()
    },
    error : (err) =>{
      console.log(err);
    }
  })

}
ngOnInit() {
  this.AddNewEvent.get('red')?.valueChanges.subscribe(value => {
   if (value === true) {
     this.colors.push('red');
   }
  });
  
  this.AddNewEvent.get('blue')?.valueChanges.subscribe(value => {
   if (value === true) {
     this.colors.push('blue');
   }
  });
  this.AddNewEvent.get('black')?.valueChanges.subscribe(value => {
   if (value === true) {
     this.colors.push('black');
   }
  });
  this.AddNewEvent.get('rose')?.valueChanges.subscribe(value => {
   if (value === true) {
     this.colors.push('rose');
   }
  });
  this.AddNewEvent.get('brown')?.valueChanges.subscribe(value => {
   if (value === true) {
     this.colors.push('brown');
   }
  });
  this.AddNewEvent.get('gray')?.valueChanges.subscribe(value => {
   if (value === true) {
     this.colors.push('gray');
   }
  });
  this.AddNewEvent.get('green')?.valueChanges.subscribe(value => {
   if (value === true) {
     this.colors.push('green');
   }
  });
  this.AddNewEvent.get('yellow')?.valueChanges.subscribe(value => {
   if (value === true) {
     this.colors.push('yellow');
   }
  });
  this.AddNewEvent.get('purble')?.valueChanges.subscribe(value => {
   if (value === true) {
     this.colors.push('purble');
   }
  });

}
}
