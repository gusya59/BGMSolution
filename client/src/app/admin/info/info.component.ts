import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

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
