import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { first } from '../../../../node_modules/rxjs/operators';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  //decleration for user admins and time
  numUsers: number = 0;
  numAdmins: number =0;
  serverTime: Date;

  //constructor decleration
  //admin service imported as adminService from AdminServiceService
  constructor(private adminService: AdminServiceService) { 
    //get system time acording to zolo
    setInterval(() => {
    this.serverTime = new Date();
  }, 1); 
  }

  //on page init load empty values to show some data
  //input: 
  //output: 
  ngOnInit() {

    this.numUsers;
    this.numAdmins;

    // call update function
    this.updatePage();
 }

  //page update function 
  //input: non
  //output: on success: setup number of user and number of admins on fail: msg
  updatePage(){
    //get general data from service
    this.adminService.generalInformation().pipe(first()).subscribe(
            
      data =>{
        // console.log("recived " + data.regUserAmount)
      if(data.success){
        this.numUsers = data.regUserAmount;
        this.numAdmins = data.adminUserAmount;
      }
      else console.log(data.message);
      });
  }


}

