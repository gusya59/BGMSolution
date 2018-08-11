import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: {
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
  this.adminservice.fetchUsersTable().subscribe(
    Data=>{
        this.users = Data.users;
           console.log(Data)
    })
}
  

  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].includes(searchKey);
      });
    });
  }

  search() {
    if (!this.searchText) {
      return this.users;
    }
    if (this.searchText) {
      return this.filterIt(this.users, this.searchText);
    }
  }

}
