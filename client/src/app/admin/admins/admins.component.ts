import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

    admins: {
      id: string;
      firstName: string;  
      lastName: string;
      email: string;
    }[];


    

  //table data inserted
  searchText: string;
  constructor(private adminservice: AdminServiceService) { 

  }

  ngOnInit() {


  //call admin service to get admins table
    this.adminservice.fetchAdminTable().subscribe(
      Data=>{
          this.admins = Data.admins;
             console.log(Data)
      })
  }

  //search key in arr
  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].includes(searchKey);
      });
    });
  }

  //search function
  search() {
    if (!this.searchText) {   //if we didnt search show table
      return this.admins;
    }
    if (this.searchText) {    //if we searched call filter
      return this.filterIt(this.admins, this.searchText);
    }
  }

}
