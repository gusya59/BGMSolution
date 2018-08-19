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
    created: string;
    firstName: string;  
    lastName: string;
    email: string;
  }[];
  // user data
  created: string;
  firstName: string;  
  lastName: string;
  email: string;

  //user data to show
  business_name: string;
  business_type: string;
  mobile: string; 
  phone: string; 
  city: string; 
  country: string; 
  address: string; 
  budget: number;



  //table data inserted
  searchText: string;

  
//allow to see removeModal for removeModal modal use
@ViewChild('removeModal') removeModal: ModalDirective;
  
//allow to see promoteModal for promoteModal modal use
@ViewChild('promoteModal') promoteModal: ModalDirective;

//allow to see promoteModal for promoteModal modal use
@ViewChild('infoModal') infoModal: ModalDirective;

  constructor(private adminservice: AdminServiceService) {  

  }

  ngOnInit() {
  //call admin service to get user table
  this.adminservice.fetchUsersTable(false).subscribe(
    Data=>{
        this.users = Data.adminUsers;
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
      // console.log(user);
      this.created = user.created;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.removeModal.show();
    }

    //promote User modal
    promoteUserModal(user){
      // console.log(user);
      this.created = user.created;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.promoteModal.show();
    }

    //remove user function
    removeUser(){
      this.adminservice.removeUser(this.email).subscribe(
        Data => {
          if(Data.success){
            // console.log("remove" + this.email);
            this.removeModal.hide();
          }
          else console.log(Data.message);
        }
      )
    }

    //Change user Status function is user false
    changeUserStatus(){
      this.adminservice.changeUserStatus(this.email, false).subscribe(
        Data => {
          if(Data.success){
            console.log("promoted " + this.email);
            this.promoteModal.hide();
          }
          else console.log(Data.message);
        }
      )
    }



    //Change user Status function
    userInfo(user){
      // console.log(user);
      this.created = user.created;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      

      //post to server request
      this.adminservice.userInfo(this.email).subscribe(
        Data => {
          if(Data){
            console.log(Data.userdata)
            this.business_name = Data.userdata.business_name;
            this.business_type = Data.userdata.business_type;
            this.mobile  = Data.userdata.mobile;
            this.phone = Data.userdata.phone;
            this.city  = Data.userdata.city;
            this.country = Data.userdata.country;
            this.address = Data.userdata.address;
            this.budget = Data.userdata.budget;
            this.infoModal.show();
          }
          else console.log(Data.message);
        }
      )
      
    }

}
