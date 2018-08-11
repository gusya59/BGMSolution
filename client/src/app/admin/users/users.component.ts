import { ModalDirective } from 'angular-bootstrap-md';
import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';

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
  // user data
  id: string;
  firstName: string;  
  lastName: string;
  email: string;


  //table data inserted
  searchText: string;

  
//allow to see removeModal for removeModal modal use
@ViewChild('removeModal') removeModal: ModalDirective;
  
//allow to see promoteModal for promoteModal modal use
@ViewChild('promoteModal') promoteModal: ModalDirective;

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

    //remove User modal
    removeUserModal(user){
      console.log(user);
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.removeModal.show();
    }

    //promote User modal
    promoteUserModal(user){
      console.log(user);
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.promoteModal.show();
    }

    //remove user function
    removeUser(){
      this.adminservice.removeUser(this.id).subscribe(
        Data => {
          if(Data.success){
            console.log("remove" + this.id);
            this.removeModal.hide();
          }
          else console.log(Data.message);
        }
      )
    }

    //Change user Status function
    changeUserStatus(){
      this.adminservice.changeUserStatus(this.id).subscribe(
        Data => {
          if(Data.success){
            console.log("promoted " + this.id);
            this.promoteModal.hide();
          }
          else console.log(Data.message);
        }
      )
    }

}
