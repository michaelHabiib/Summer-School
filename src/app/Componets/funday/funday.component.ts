import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ReservtionService } from 'src/app/services/reservtion.service';
export interface FundayReservtion {
  name: string;
  position: number;
  code: string;
  color : string;
  userID : {
    name : string
  }
  isPaid : boolean
}


@Component({
  selector: 'app-funday',
  templateUrl: './funday.component.html',
  styleUrls: ['./funday.component.css']
})


export class FundayComponent implements OnInit {
  modal : any
  id! : string
  constructor(private _ReservtionService : ReservtionService){}
  displayedColumns: string[] = ['position', 'name', 'code','color','checkbox'];
  dataSource = new MatTableDataSource<FundayReservtion>;

  GetAllFundayReservtion(){
    this._ReservtionService.GetAllFundayReservtions().subscribe({
      next :  (result) =>{
        console.log(result);
        this.dataSource.data = result

        // this.data = result
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  submitForm(element : any){
    this.id = element._id
    this.modal = {
      isPaid  : !element.isPaid
    }
    this._ReservtionService.UpdateCashReservtion(this.modal,this.id).subscribe({
      next : (result) =>{
        console.log(result);
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.GetAllFundayReservtion()
    
  }
}
