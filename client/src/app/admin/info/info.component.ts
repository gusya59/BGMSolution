import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { first } from '../../../../node_modules/rxjs/operators';


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

    this.numUsers;
    this.numAdmins;

  this.updatePage();
 }
  updatePage(){
    //get general data from service
    this.adminService.generalInformation().pipe(first()).subscribe(
            
      data =>{
        // console.log("recived " + data)
      if(data.success){
        this.numUsers = data.regUserAmount;
        this.numAdmins = data.adminUserAmount;
      }
      else console.log(data.message);
      });
  }


}

