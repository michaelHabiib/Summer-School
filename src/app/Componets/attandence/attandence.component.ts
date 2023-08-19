import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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

export class AttandenceComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatDatepicker, {static: false}) datepicker!: MatDatepicker<Date>; 
  users : any[] = []
  ELEMENT_DATA: User[] = [];
  modal : any
  today = new Date().toISOString().substring(0,10)
  todayGen = new Date().toISOString().substring(0,10)
  todayGen1 = new Date().toISOString().substring(0,10)
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
  selectedDayToDownloadSheet = this.formatDate(new Date());
  message! : string
  StartDateSelected! : any
  EndDateSelected! : any
  userCode : any
  userData : any
  Attendance : any
  AttendanceTrue : any
  haveData : boolean = false

  constructor(private _ReservtionService :ReservtionService,
              private route : ActivatedRoute,
              private _snackBar: MatSnackBar){}
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  // this form to listen to checkbox value
  CheckForm = new FormGroup({
    check: new FormControl('', [Validators.required]),
  });

  // function to Get All Users
  GetAllUsers(){
    this.loading = true
    this.GetAttendanceOfDay()                                             
    this._ReservtionService.GetUsersByYear(this.year).subscribe({
      next : (result) =>{
        this.loading = false
        this.users = result.users 
      },
      error : (err) =>{
        this.openSnackBar(err.error.message)
      }
    })
  }
  GenrateDate(){
    this._ReservtionService.GetAttOfDay(this.todayGen1, this.year).subscribe({
      next : (result) =>{
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

  // function to listen to what user select than make some functionlty to display every user and his attedance()
  onDateChangeGenrate(event: MatDatepickerInputEvent<Date>){
    this.loading = true
    this.isGeneralTableVisible = true
    this.selectedDateGen = event.target.value
    this.AttDateGen = new Date(Date.UTC(this.selectedDateGen.getFullYear(), this.selectedDateGen.getMonth(), this.selectedDateGen.getDate())).toISOString().slice(0, 10);


    this.GetAllUsers()

    this._ReservtionService.GetAttOfDay(this.AttDateGen, this.year).subscribe({
      next : (result) =>{
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
  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 4000, // 5 seconds
      panelClass: 'custom-snackbar',
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    });
  }
  GetAttendanceOfDay(){
    this._ReservtionService.GetAttOfDay(this.today,this.year).subscribe({
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
        // console.log(err);
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
        this.openSnackBar(result.message)
      },
      error : (err) =>{
        this.openSnackBar(err.error.message)
      }
    })
  }
  SelectDate(event: MatDatepickerInputEvent<Date>) {
    const selectedDate: Date = event.target.value as Date; // Assuming event.target.value is of type Date
    if (selectedDate) {
      this.selectedDayToDownloadSheet = this.formatDate(selectedDate);
    } else {
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }
  exportAttendance() {
    this._ReservtionService.downloadAttendanceSheet(this.selectedDayToDownloadSheet,this.year).subscribe(() => { 
      this.loading = false
      this.openSnackBar('File downloaded successfully.')
      },
      (error) => {
        this.openSnackBar('Error downloading file.')
      })
  }
  chooseClass(year :any){
    if(year === 'all'){
      return 'All Classes'
    }else if(year === 'user'){
      return 'Get Attendance Of Spesfic User'
    }else if (year === 'bc'){
      return 'Baby Class'
    }else if (year === 'kg1'){
      return 'KG1 Class'
    }else if (year === 'kg2'){
      return 'KG2 Class'
    }else if (year === 'prim1'){
      return 'Prim 1 Class'
    }else{
      return ''
    }
  }
  onSubmit(event : any){
    this.loading = true
    const userCode = event.target.querySelector('input').value;
    this._ReservtionService.GetAttendanceOfUser(userCode).subscribe({
      next : (result) =>{
        this.loading = false
        this.haveData = true
        this.AttendanceTrue = []
        this.userData = result.user
        this.Attendance = result.AttendanceData
        for(const att of result.AttendanceData){
          if(att.isChecked){
            this.AttendanceTrue.push(att)
          }
        }        
      },
      error : (err) =>{
        this.haveData = false
        this.AttendanceTrue = []
        this.Attendance = []
        this.userData = {}
        this.loading = false
        this.openSnackBar(err.error.message)
        // console.log(err);
      }
    })
    
  }
  ngOnInit() {
    this.AttDate = new Date().toISOString().substring(0,10)
    this._ReservtionService.selectedValueChanged.subscribe(value => {
        this.year = value;
        this.GetAllUsers()
        this.GetAttendanceOfDay()
        this.GenrateDate()
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

