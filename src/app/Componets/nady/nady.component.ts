import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nady',
  templateUrl: './nady.component.html',
  styleUrls: ['./nady.component.css']
})
export class NadyComponent implements AfterViewInit, OnInit {

  constructor(private elementRef: ElementRef,
     private _ReservtionService : ReservtionService,
     public EventService : EventService,
     private _snackBar: MatSnackBar  ){}
  ngOnInit(): void {
    this.getAllEvents()
  }
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  loading = false;
  message : String | undefined 
  weeks = this._ReservtionService.weeks
  SummerEvents :any [] = []
  getAllEvents(){
    this.loading = true
    this.EventService.getAllEvents().subscribe({
      next : (result) => {
        this.loading = false
        console.log(result);
        for(let i =0; i < result.length; i++){
          
          if(result[i].avaliableDates.length != 0){
            continue;
          }else{
            this.SummerEvents.push(result[i])
            console.log(this.SummerEvents);
          }
        }
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 4000, // 5 seconds
      panelClass: 'custom-snackbar',
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    });
  }
  ReserveNady(group: any, eventCode : string) {
    if(localStorage.getItem('token')){
      this.loading = true
      let modal = {
        code : localStorage.getItem('code'),
        geroupID : group._id,
        eventCode : eventCode,
        userID : localStorage.getItem('userID')
      }
      console.log(modal);
      const token = localStorage.getItem('token')
      this._ReservtionService.ReservNady(modal,token).subscribe({
        next : (result) =>{
          console.log(result);
          this.loading = false
          this.openSnackBar(result.message)
        },
        error : (err) =>{
          console.log(err);
          this.openSnackBar(err.error.message)
          this.loading = false
        }
      })    
    }else{
      Swal.fire('Please Login First ')
    }
  }

}
