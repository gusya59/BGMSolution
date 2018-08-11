import { AdminServiceService } from './../../service/admin-service.service';
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

  constructor(private adminService: AdminServiceService) { 
    //get system time acording to zolo
    setInterval(() => {
    this.serverTime = new Date();
  }, 1); 
  }

  ngOnInit() {

    //get general data from service
    this.adminService.generalInformation().subscribe(
      data =>{
      if(data.success){
        this.numUsers = data.numUsers;
        this.numAdmins = data.numAdmins;
      }
      else console.log(data.message);

  })

  }

}
