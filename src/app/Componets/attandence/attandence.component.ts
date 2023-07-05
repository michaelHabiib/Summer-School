import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
interface User {
  code: string;
  position: number;
  name: string;
}
interface AttData {
  code :string,
  ischecked : boolean
}

@Component({
  selector: 'app-attandence',
  templateUrl: './attandence.component.html',
  styleUrls: ['./attandence.component.css'],
})

export class AttandenceComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatDatepicker, {static: false}) datepicker!: MatDatepicker<Date>; 
  users : any[] = []
  ELEMENT_DATA: User[] = [];
  modal : any
  today = new Date().toISOString().substring(0,10)
  todayGen = new Date().toISOString().substring(0,10)
  DayString = ''
  selectedDate!: any;
  selectedDateGen!: any;
  AttDate: string = ''
  AttDateGen: string = ''
  AttendanceData: any[] = []
  AttendanceDataGen: any[] = []
  userAttendanceData : any
  isChecked: boolean = false;
  dataSource: any;
  dataSourceGen: any;
  dataSourceItems :any[]= []
  dataSourceItemsGen :any[]= []
  date = new Date()
  displayedColumns: string[] = ['postion', 'code', 'name','checkbox'];
  displayedColumnsGen: string[] = ['postion', 'code', 'name','Attendance'];
  isGeneralTableVisible : Boolean = true
  loading = false
  year!: any;


  constructor(private _ReservtionService :ReservtionService,
  private route : ActivatedRoute){}
  // this form to listen to checkbox value
  CheckForm = new FormGroup({
    check: new FormControl('', [Validators.required]),
  });

  // function to Get All Users
  GetAllUsers(){
    console.log(this.year);
    this._ReservtionService.GetUsersByYear(this.year).subscribe({
      next : (result) =>{
        console.log(result);
        this.users = result.users
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }

  // function to listen to what user select than make some functionlty to display every user and his attedance()
  onDateChangeGenrate(event: MatDatepickerInputEvent<Date>){
    this.loading = true
    this.isGeneralTableVisible = true
    this.selectedDateGen = event.target.value
    this.AttDateGen = new Date(Date.UTC(this.selectedDateGen.getFullYear(), this.selectedDateGen.getMonth(), this.selectedDateGen.getDate())).toISOString().slice(0, 10);
    // console.log(this.AttDateGen);

    this.GetAllUsers()

    this._ReservtionService.GetAttOfDay(this.AttDateGen, this.year).subscribe({
      next : (result) =>{
        // console.log(result);
        this.AttendanceDataGen = result
          this.dataSourceItemsGen = [];
          this.users.forEach(user => {
            const alreadyAddedd = this.dataSourceItemsGen.some(item => item.code === user.code);
            if (alreadyAddedd) {
              return;
            }
            const attt = this.AttendanceDataGen.find((a) => a.code === user.code);
            if (attt) {
              this.dataSourceItemsGen.push({
                code: user.code,
                name: user.name,
                isChecked: true,
                Attedance : 'yes'
              });
            } else {
              this.dataSourceItemsGen.push({
                code: user.code,
                name: user.name,
                isChecked: false,
                Attedance : 'No'
              });
            }
          });
          this.loading = false
        // console.log(this.dataSourceItemsGen);
        this.dataSourceGen = new MatTableDataSource(this.dataSourceItemsGen);
        this.dataSourceGen.sort = this.sort;
      },
      error : (err) =>{
        console.log(err);
      }
    })
    
  }
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.loading = true
    this.isGeneralTableVisible = false
    this.selectedDate = event.target.value;
    this.AttDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate())).toISOString().slice(0, 10);
    // console.log('Selected date:', this.AttDate);
    
    this.GetAllUsers()
    // console.log(this.AttDate);
    // console.log(this.year);
    
    this._ReservtionService.GetAttOfDay(this.AttDate,this.year).subscribe({
      next : (result) =>{
        console.log(result);
        this.AttendanceData = result
        if (this.AttendanceData.length === 0) {
          this.dataSourceItems = this.users;
        } else {
          this.dataSourceItems = [];
          this.users.forEach(user => {
            const alreadyAdded = this.dataSourceItems.some(item => item.code === user.code);
            if (alreadyAdded) {
              return;
            }
            const att = this.AttendanceData.find((a) => a.code === user.code);
            if (att) {
              this.dataSourceItems.push({
                code: user.code,
                name: user.name,
                isChecked: true
              });
            } else {
              this.dataSourceItems.push({
                code: user.code,
                name: user.name,
                isChecked: false
              });
            }
          });
        }
        this.loading = false
        // console.log(this.dataSourceItems);
        this.dataSource = new MatTableDataSource(this.dataSourceItems);
        this.dataSource.sort = this.sort;
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }

  // this filter to filter datain the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource){
      this.dataSource.filter = filterValue.trim().toLowerCase();

    }
  }
  applyFilterGen(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSourceGen){
      this.dataSourceGen.filter = filterValue.trim().toLowerCase();

    }
  }

  // function to send attedance
  submitForm(data:AttData){
    this.modal = {
       code : data.code,
       AttDate : this.AttDate,
       isChecked : true
    }
    this._ReservtionService.SaveAttendance(this.modal).subscribe({
      next : (result)=>{
      },
      error : (err) =>{
      }
    })
  }
  ngOnInit() {
    this._ReservtionService.selectedValueChanged.subscribe(value => {
        this.year = value;
      console.log(this.year);
      
    });
  }

}

