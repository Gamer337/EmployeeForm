import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../model/user';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  fsubList:Array<any> = JSON.parse(localStorage.getItem('Users') || '{}');
  displayedColumns: string[] = ['name', 'age', 'address'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) dataSource!: MatTableDataSource<User>;

  constructor() { }

  ngOnInit() {
    //this.display();
    this.dataSource = new MatTableDataSource(this.fsubList);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //clickedRows = new Set<User>();

  delete(){
    localStorage.removeItem('Users');
  }

  // display() {
  //   return localStorage.getItem('Users');
  // }

}
