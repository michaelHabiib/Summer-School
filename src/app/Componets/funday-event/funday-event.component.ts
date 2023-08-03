import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-funday-event',
  templateUrl: './funday-event.component.html',
  styleUrls: ['./funday-event.component.css']
})
export class FundayEventComponent {
  constructor(private formBuilder: FormBuilder,
              public _EventService: EventService,
              private _snackBar: MatSnackBar){}
  
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
  colors: any[] = [] 

  get dates() : FormArray{
    return this.AddNewEvent.controls["dates"] as FormArray;
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 4000, // 5 seconds
      panelClass: 'custom-snackbar',
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    });
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
    colors: this.colors,
    avaliableDates:this.AddNewEvent.controls.dates.value
  } 
  console.log(modal);
  
  this._EventService.AddNewEvent(modal).subscribe({
    next : (result) => {
      this.loading = false
      this.openSnackBar(result.message)
      this.AddNewEvent.reset()
    },
    error : (err) =>{
      this.openSnackBar(err.error.message)
    }
  })
}
ngOnInit() {
  this.AddNewEvent.get('red')?.valueChanges.subscribe(value => {
    
   if (value === true) {
     this.colors.push({color : 'red'});
   }else{
    if(this.colors.includes({color : 'red'})){
      let index = this.colors.indexOf({color : 'red'})
      this.colors.splice(index,1)
    }
   }

  });
  
  this.AddNewEvent.get('blue')?.valueChanges.subscribe(value => {
    
    if (value === true) {
      this.colors.push({color : 'blue'});
    }else{
     if(this.colors.includes({color : 'blue'})){
       let index = this.colors.indexOf({color : 'blue'})
       this.colors.splice(index,1)
     }
    }
 
  });
  this.AddNewEvent.get('black')?.valueChanges.subscribe(value => {
    if (value === true) {
      this.colors.push({color : 'black'});
    }else{
     if(this.colors.includes({color : 'black'})){
       let index = this.colors.indexOf({color : 'black'})
       this.colors.splice(index,1)
     }
    }
 
  });
  this.AddNewEvent.get('rose')?.valueChanges.subscribe(value => {
    if (value === true) {
      this.colors.push({color : 'rose'});
    }else{
     if(this.colors.includes({color : 'rose'})){
       let index = this.colors.indexOf({color : 'rose'})
       this.colors.splice(index,1)
     }
    }
 
  });
  this.AddNewEvent.get('brown')?.valueChanges.subscribe(value => {
    if (value === true) {
      this.colors.push({color : 'brown'});
    }else{
     if(this.colors.includes({color : 'brown'})){
       let index = this.colors.indexOf({color : 'brown'})
       this.colors.splice(index,1)
     }
    }
 
  });
  this.AddNewEvent.get('gray')?.valueChanges.subscribe(value => {
    if (value === true) {
      this.colors.push({color :'gray'});
    }else{
     if(this.colors.includes({color :'gray'})){
       let index = this.colors.indexOf({color :'gray'})
       this.colors.splice(index,1)
     }
    }
 
  });
  this.AddNewEvent.get('green')?.valueChanges.subscribe(value => {
    if (value === true) {
      this.colors.push({color  :'green'});
    }else{
     if(this.colors.includes({color  :'green'})){
       let index = this.colors.indexOf({color  :'green'})
       this.colors.splice(index,1)
     }
    }
 
  });
  this.AddNewEvent.get('yellow')?.valueChanges.subscribe(value => {
    if (value === true) {
      this.colors.push({color  :'yellow'});
    }else{
     if(this.colors.includes({color  :'yellow'})){
       let index = this.colors.indexOf({color  :'yellow'})
       this.colors.splice(index,1)
     }
    }
 
  });
  this.AddNewEvent.get('purble')?.valueChanges.subscribe(value => {
    if (value === true) {
      this.colors.push({color  :'purble'});
    }else{
     if(this.colors.includes({color  :'purble'})){
       let index = this.colors.indexOf({color  :'purble'})
       this.colors.splice(index,1)
     }
    }
  });
}
}
