import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ReservtionService } from 'src/app/services/reservtion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatIconModule } from '@angular/material/icon';
// import { NgFor, NgIf } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaticsService } from 'src/app/services/statics.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


export interface User {
  code: number;
  name: string;
  year : string
  phone: number
  bulidingNumber: number
  street:string
  Area: string
  BirthdayDate: string
  createdAt: string
  email : string 
  // Add other properties as needed
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})


export class ManageUsersComponent implements OnInit {
  years = ['bc', 'kg1', 'kg2', 'prim1']
  columnsToDisplay = ['code','name', 'year' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: User | null
  userData: { [key: number]: FormGroup } = {};
  selectedYear : string = 'All'
  alluserData : any [] = []
  mika : any
  mizo : User[] = [];
  filteredData: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(this.filteredData);
  loading : boolean = false
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(public _ReservtionService :  ReservtionService, public _StaticsService : StaticsService,
     private _snackBar: MatSnackBar, private formBuilder: FormBuilder){}

    //  ngAfterViewInit() {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }

  getAllUser(){
    this.loading = true
    this._ReservtionService.GetAllUsers().subscribe({
      next : (result) => {
        this.loading = false
        this.alluserData = result.users
        this.dataSource.data = this.alluserData
        this.loopOnData()
      },
       error : (err) => {
        this.loading = false
        this.openSnackBar(err.error.message)
      }
    })
  }

  selectYear(year: string) {
    if (year === 'All') {
      this.filteredData = this.alluserData;
    } else {
      this.filteredData = this.alluserData.filter(item => item.year === year);
    }
    this.mizo = this.filteredData
    this.dataSource.data = this.filteredData;
    this.loopOnData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    this.filteredData = this.mizo.filter(
      item =>
        item.name.toLowerCase().includes(filterValue) ||
        (item.code.toString().toLowerCase().includes(filterValue))
    );
    this.dataSource.data = this.filteredData;
        this.loopOnData()
  }
  loopOnData(){
    for(let i = 0; i < this.dataSource.data.length; i++){
      this.userData[i] = this.formBuilder.group({
        name: [this.dataSource.data[i].name, [Validators.required,this.nameValidator]],
        code: [this.dataSource.data[i].code, Validators.required],
        phone: [this.dataSource.data[i].phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        year: [this.dataSource.data[i].year, Validators.required],
        buildingNumber: [this.dataSource.data[i].bulidingNumber, Validators.required],
        street: [this.dataSource.data[i].street, Validators.required],
        area: [this.dataSource.data[i].Area, Validators.required],
        birthday: [this.dataSource.data[i].BirthdayDate, [Validators.required]],
        email: [this.dataSource.data[i].email, Validators.required],
        createAt: [this.get_date_and_time(this.dataSource.data[i].createdAt), Validators.required]
      });
    }
  }
  get_date_and_time(date_str :  string) {
    // Parse the date string into a JavaScript Date object.
    const date_obj = new Date(date_str);
  
    // Get the date, hour, and minutes from the Date object.
    const date = date_obj.getDate();
    const month = date_obj.getMonth() + 1; // Months are zero-indexed in JavaScript.
    const year = date_obj.getFullYear();
    const hour = date_obj.getHours();
    const minute = date_obj.getMinutes();
  
    // Return the date and time.
    return  `${date}/${month}/${year} at ${hour} : ${minute}`

  }
  DeleteUser(user : any){
    const code = user.value.code
    this._ReservtionService.DeleteUser(code).subscribe({
      next : (result) => {
        this.getAllUser()
        // console.log(result);
        this.openSnackBar(result.message)
      },
      error : (err) => {
        this.openSnackBar(err.error.message)
      }
    })
  }
  updateUser(user : any){
    // console.log(user.value.birthday);
    const birthdayDateString: any = user.value.birthday;
    const birthdayDate: Date = new Date(birthdayDateString);
    const formattedBirthdayDate: string = birthdayDate.toISOString().substring(0, 10);
    // console.log(formattedBirthdayDate);
    let modal = {
      code : user.value.code,
      name : user.value.name,
      phone : user.value.phone,
      year : user.value.year,
      bulidingNumber : user.value.buildingNumber,
      street: user.value.street,
      Area : user.value.area,
      BirthdayDate :formattedBirthdayDate
    }
    this._StaticsService.updateUser(modal).subscribe({
      next : (result) => {
        this.openSnackBar(result.message)
      }, error : (err) => {
        // console.log(err);
        this.openSnackBar(err.error.message)
      }
    })
  }
  
  nameValidator(control: any) {  
    if (!control || !control.value) {
      return null; // Return null if the control is empty or null
    }
  
    const names = control.value.split(' ');
    if (names.length < 4) {
      return { 'name': 'Please enter at least 3 names' }; // Return an error object if the number of names is less than 4
    }
  
    return null; // Return null if the validation succeeds
  }
 
  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 4000, // 4 seconds
      panelClass: 'custom-snackbar',
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    });
  }
  ngOnInit(): void {
    this.getAllUser()
  }
}
