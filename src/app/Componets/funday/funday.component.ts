import { AfterViewInit, Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { EventService } from 'src/app/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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

export class FundayComponent implements OnInit, AfterViewInit {
  modal : any
  id! : string
  message! : string
  loading : Boolean = false
  fundays: any [] = []
  event! : number
  constructor(private _ReservtionService : ReservtionService,
              public EventService : EventService,
              private _snackBar: MatSnackBar)
              {}
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  getAllEvents(){
    this.loading = true
    this.EventService.getAllEvents().subscribe({
      next : (result) => {
        this.loading = false
        console.log(result);
        for(let i = 0; i < result.length; i++){
          if(result[i].colors.length){
            const event = result[i]
            this.fundays.push(event)
          }else{
            continue;
          }
        }
        console.log(this.fundays);
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  selectEvent(event: any){
    console.log(event.value);
    console.log('as');
    this.GetAllFundayReservtion(event.value)
  }
  selectEventExcel(event:any){
    this.event = event.value
    console.log(this.event);
    
  }
  displayedColumns: string[] = ['position', 'name', 'code','color','checkbox'];
  dataSource = new MatTableDataSource<FundayReservtion>;

  GetAllFundayReservtion(eventCode:number){ 
    this._ReservtionService.GetAllFundayReservtions(eventCode).subscribe({
      next :  (result) =>{
        this.loading = false
        this.dataSource.data = result
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
        this.openSnackBar(result.message)
      },
      error : (err) =>{
        this.openSnackBar(err.error.message)
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    openSnackBar(message: string) {
      this._snackBar.open(message, '',{
        duration: 4000, // 5 seconds
        panelClass: 'custom-snackbar',
        verticalPosition: 'bottom', 
        horizontalPosition: 'center'
      });
    }

  downloadFundaySheet() {
    this.loading = true
    this._ReservtionService.downloadFundayReservation(this.event).subscribe(() => {
      this.loading = false
      this.openSnackBar( 'File downloaded successfully.')
    }, (error) => {
      this.openSnackBar('Error downloading file.')
    })
  }
  ngOnInit(): void {
    this.message = ''
    this.loading = true
    this.getAllEvents()
  }
}
