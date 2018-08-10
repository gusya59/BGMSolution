
import { Component, OnInit } from '@angular/core';
import { Time, getLocaleDateTimeFormat } from '../../../node_modules/@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  //general values
  numUsers: number = 0;
  numAdmins: number =0;
  serverTime: Date;

  constructor() { 
    //get system time acording to zolo
    setInterval(() => {
      this.serverTime = new Date();
    }, 1);
  }

  ngOnInit() {

    // on page build load server Data
    this.numUsers = 1500;
    this.numAdmins = 3;

  }

  

}
