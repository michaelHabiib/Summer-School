import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { FundayReservtion } from '../funday/funday.component';
export interface NadyReservtion {
  name: string;
  position: number;
  code: string;
  color : string;
  duration : string;
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
  constructor(private _ReservtionService : ReservtionService){}
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  displayedColumns: string[] = ['position', 'name', 'code','duration','color','checkbox'];
  dataSource = new MatTableDataSource<NadyReservtion>;

  GetAllNadyReservtion(){ 
    this._ReservtionService.GetAllNadyReservtion().subscribe({
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
    this.code = element.code
    this.duration = element.duration

    this._ReservtionService.updateCashReservtionNady(this.code,this.duration).subscribe({
      next : (result) =>{
        // console.log(result);
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  downloadNadySheet() {
    this.loading = true
    this._ReservtionService.downloadnadyReservtionExcelSheet().subscribe(() => {
      this.loading = false
      this.message = 'File downloaded successfully.'
    }, (error) => {
      console.log(error);
      alert('Error downloading file.');
    })
  }
  ngOnInit(): void {
    this.message = ''
    this.loading = true
    this.GetAllNadyReservtion()
  }
}
