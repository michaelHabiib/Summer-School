import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { StaticsService } from 'src/app/services/statics.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
export interface user {
  position   :number;
  code : Number;
  name: string;
  phone : string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public _StaticsService : StaticsService){}
  totalusers! : number
  totalFunday : any [] = []
  totalNady: any [] = []
  totalFundayCash : any [] = []
  totalNadyCash : any [] = []
  totalusersInClass :any [] = []
  totalBirthdays : any [] = []
  loading! : boolean
  displayedColumns: string[] = ['position', 'code', 'name', 'phone'];
  dataSource = new MatTableDataSource
  ngOnInit(): void {
    this.getUsersCount()
    this.getUsersInEachClass()
    this.getBirthdayOfToday()
    this.getFundaysCount()
    this.getFundayCash()
    this.getNadyCount()
    this.getnadyCash()
    this.loading = false
  }

  getUsersCount(){
    this.loading = true
    this._StaticsService.getUserCount().subscribe({
      next : (result) =>{
        this.loading = false
        this.totalusers = result.totalUsers
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  getUsersInEachClass (){
    this.loading = true
    this._StaticsService.getUsersInEachClass().subscribe({
      next : (result) =>{
        this.loading = false
        this.totalusersInClass = result
      },
      error : (err) => {
        // console.log(err);
      }
    })
  }
  getBirthdayOfToday () {
    this.loading = true
    this._StaticsService.getBirthdaysOfToday().subscribe({
      next : (result) => {
        this.loading = false
        this.dataSource.data = result
        this.totalBirthdays = result
      },
      error : (err) => {
        // console.log(err);
      }
    })
  }
  getFundaysCount(){
    this.loading = true
    this._StaticsService.getfundayCount().subscribe({
      next : (result) =>{
        this.loading = false
        this.totalFunday = result.total
      },
      error : (err) =>{
        // console.log(err);
      }
    })
  }
  getFundayCash(){
    this.loading = true
    this._StaticsService.getCashForFunday().subscribe({
      next : (result) => {
        this.loading = false
        this.totalFundayCash = result
      },
      error :(err) => {
        // console.log(err);
      }
    })
  }
  getNadyCount(){
    this.loading = true
    this._StaticsService.getNadyCount().subscribe({
      next : (result) => {
        this.loading = false
        this.totalNady = result
      }, 
      error : (err) => {
        // console.log(err);
      }
    })
  }
  getnadyCash(){
    this.loading = true
    this._StaticsService.getNadyCash().subscribe({
      next : (result) => {
        this.loading = false
        this.totalNadyCash = result
      },
      error :(err) => {
        // console.log(err);
      }
    })
  }
}
