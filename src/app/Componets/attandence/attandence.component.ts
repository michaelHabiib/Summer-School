import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';

// import { saveAs } from 'file-saver';
interface User {
  code: string;
  position: number;
  name: string;
}
interface AttData {
  code :string,
  ischecked : boolean,
  userID : string
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
  selectedDayToDownloadSheet! : any
  message! : string
  StartDateSelected! : any
  EndDateSelected! : any


  constructor(private _ReservtionService :ReservtionService,
  private route : ActivatedRoute){}
  // this form to listen to checkbox value
  CheckForm = new FormGroup({
    check: new FormControl('', [Validators.required]),
  });

  // function to Get All Users
  GetAllUsers(){
    // console.log(this.year);
    this._ReservtionService.GetUsersByYear(this.year).subscribe({
      next : (result) =>{
        // console.log(result);
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
          this.users.forEach(user =>{
            const alreadyHaveAttendance = this.AttendanceDataGen.find((a) => a.code === user.code)
            
            if(alreadyHaveAttendance){
              if(alreadyHaveAttendance.isChecked){
                this.dataSourceItemsGen.push({
                  code : user.code,
                  name : user.name,
                  Attedance : 'Yes'
                })
              }else{
                this.dataSourceItemsGen.push({
                  code : user.code,
                  name : user.name,
                  Attedance : 'No'
                })
              }
            }else{
              this.dataSourceItemsGen.push({
                code : user.code,
                name : user.name,
                Attedance : 'No'
              })
            }
          })
          this.loading = false
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
    
    this.GetAllUsers()
    
    this._ReservtionService.GetAttOfDay(this.AttDate,this.year).subscribe({
      next : (result) =>{
        this.AttendanceData = result
        this.dataSourceItems = []
        this.users.forEach(user => {
          const attendanceOfUser = this.AttendanceData.find((a) => a.code === user.code)
          if(attendanceOfUser){
            if(attendanceOfUser.isChecked){
              this.dataSourceItems.push({
                code : user.code,
                name : user.name,
                isChecked : true,
                userID : user._id 
              })
            }else{
              this.dataSourceItems.push({
                code : user.code,
                name : user.name,
                isChecked : false,
                userID : user._id 
              })
            }
          }else{
            this.dataSourceItems.push({
              code : user.code,
              name : user.name,
              isChecked : false,
              userID : user._id 
            })
          }
        })
        this.loading = false
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
       isChecked : true,
       kidClass : this.year,
       userID : data.userID
    }
    this._ReservtionService.SaveAttendance(this.modal).subscribe({
      next : (result)=>{
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  SelectDate(event: MatDatepickerInputEvent<Date>){
    this.selectedDayToDownloadSheet = event.target.value
    this.selectedDayToDownloadSheet = new Date(Date.UTC(this.selectedDayToDownloadSheet.getFullYear(), this.selectedDayToDownloadSheet.getMonth(), this.selectedDayToDownloadSheet.getDate())).toISOString().slice(0, 10);
  }
  exportAttendance() {
    this._ReservtionService.downloadAttendanceSheet(this.selectedDayToDownloadSheet,this.year).subscribe(() => {
      this.loading = false
      this.message = 'File downloaded successfully.'},
      (error) => {
        console.log(error);
        alert('Error downloading file.');
      })
  }
  StartDate(event: MatDatepickerInputEvent<Date>){
    this.StartDateSelected = event.target.value
    this.StartDateSelected = new Date(Date.UTC(this.StartDateSelected.getFullYear(), this.StartDateSelected.getMonth(), this.StartDateSelected.getDate())).toISOString().slice(0, 10);

  }
  EndDate(event: MatDatepickerInputEvent<Date>){
    this.EndDateSelected = event.target.value
    this.EndDateSelected = new Date(Date.UTC(this.EndDateSelected.getFullYear(), this.EndDateSelected.getMonth(), this.EndDateSelected.getDate())).toISOString().slice(0, 10);
  }
  exportAttendanceInRange(){
    
  }
  ngOnInit() {
    this._ReservtionService.selectedValueChanged.subscribe(value => {
        this.year = value;
      console.log(this.year);
      
    });
  }

}

function trigger(arg0: string, arg1: any[]): any {
  throw new Error('Function not implemented.');
}

function state(arg0: string, arg1: any): any {
  throw new Error('Function not implemented.');
}

function style(arg0: { opacity: number; }): any {
  throw new Error('Function not implemented.');
}

function animate(arg0: number): any {
  throw new Error('Function not implemented.');
}

