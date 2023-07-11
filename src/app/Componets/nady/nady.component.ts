import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservtionService } from 'src/app/services/reservtion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nady',
  templateUrl: './nady.component.html',
  styleUrls: ['./nady.component.css']
})
export class NadyComponent {

  constructor(private elementRef: ElementRef, private _ReservtionService : ReservtionService ){}
  loading = false;
  message : String | undefined 
  weeks = this._ReservtionService.weeks

  NewResForNady = new FormGroup({
    CodeForm: new FormControl('', [Validators.required]),
    ColorGroup: new FormControl('', [Validators.required]),
  });

  ReserveNady(codeValue: any,ColorValue: string,monthForm:string) {
    if(localStorage.getItem('token')){
      this.loading = true
      let modal = {
        code : codeValue,
        color : ColorValue,
        duration : monthForm
      }
      const token = localStorage.getItem('token')
      this._ReservtionService.ReservNady(modal,token).subscribe({
        next : (result) =>{
          this.loading = false
          this.message = result.message
          codeValue = ''
          this.NewResForNady.reset()
        },
        error : (err) =>{
          console.log(err);
          this.message = err.error.message
          this.loading = false
          this.NewResForNady.reset()
        }
      })    
    }else{
      Swal.fire('Please Login First ')
    }
  }
  ReserveHoleNady() {
    if(localStorage.getItem('token')){
      this.loading = true
      let modal = {
        code : this.NewResForNady.value.CodeForm,
        color : this.NewResForNady.value.ColorGroup,
        duration : 'full'
      }
      // console.log(modal);
      
      const token = localStorage.getItem('token')
      this._ReservtionService.ReservNady(modal,token).subscribe({
        next : (result) =>{
          this.loading = false
          this.message = result.message
          this.NewResForNady.reset()
        },
        error : (err) =>{
          // console.log(err);
          this.message = err.error.message
          // console.log(this.message);
          this.loading = false
        }
      })    
    }else{
      Swal.fire('Please Login First ')  
    }
  }

  GetErrorPasswordMsg(){
    if (this.NewResForNady.controls.CodeForm.hasError('required')) {
      return 'You must enter a value ';
    }else{
      return '';
    }
  }

}
