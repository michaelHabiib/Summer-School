import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { FundayReservtion } from '../funday/funday.component';
import { EventService } from 'src/app/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface NadyReservtion {
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
  selector: 'app-nady-result',
  templateUrl: './nady-result.component.html',
  styleUrls: ['./nady-result.component.css']
})
export class NadyResultComponent implements AfterViewInit{

  duration!: string
  code! : string
  message! : string
  loading : Boolean = false
  nadys : any []= []
  event! : number
  eventCode! : number
  selectedValue! : number
  constructor(private _ReservtionService : ReservtionService,
              public EventService : EventService,
              private _snackBar: MatSnackBar){}
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  displayedColumns: string[] = ['position', 'name', 'code','color','checkbox'];
  dataSource = new MatTableDataSource<NadyReservtion>;

  GetAllNadyReservtion(eventCode: number){   
    this._ReservtionService.GetAllNadyReservtion(eventCode).subscribe({
      next :  (result) =>{
        console.log(result);
        this.loading = false
        this.dataSource.data = result
      },
      error : (err) =>{
        this.openSnackBar(err.error.message)
      }
    })
  }
  submitForm(element : any){
    this.code = element.code
    this.eventCode = element.eventCode

    this._ReservtionService.updateCashReservtionNady(this.code,this.eventCode).subscribe({
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

  getAllEvents(){
    this.loading = true
    this.EventService.getAllEvents().subscribe({
      next : (result) => {
        this.loading = false
        for(let i = 0; i < result.length; i++){
          if(result[i].colors.length){
            continue;
          }else{
            const event = result[i]
            this.nadys.push(event)
          }
        }
      },
      error : (err) =>{
        this.openSnackBar(err.error.message)
      }
    })
  }
  selectEvent(event: any){
    console.log(event.value);
    this.GetAllNadyReservtion(event.value)
  }
  selectEventExcel(event:any){
    this.event = event.value
    console.log(this.event);
    
  }

  downloadNadySheet() {
    this.loading = true
    this._ReservtionService.downloadnadyReservtionExcelSheet(this.event).subscribe(() => {
      console.log(this.event);
      this.loading = false
      this.openSnackBar( 'File downloaded successfully.')
    }, (error) => {
      this.openSnackBar( 'Error downloading file.')
    })
  }
  ngOnInit(): void {
    this.message = ''
    this.loading = true
    this.getAllEvents()
  }
}
