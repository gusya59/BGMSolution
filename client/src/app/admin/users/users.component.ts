import { ModalDirective } from 'angular-bootstrap-md';
import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // users object declaration
  users: {
    created: string;
    firstName: string;  
    lastName: string;
    email: string;
  }[];
  // user data declaration
  created: string;
  firstName: string;  
  lastName: string;
  email: string;

  //user data to show declaration
  business_name: string;
  business_type: string;
  mobile: string; 
  phone: string; 
  city: string; 
  country: string; 
  address: string; 
  budget: number;



  //table search declaration
  searchText: string;

  
//allow to see removeModal for removeModal modal use
@ViewChild('removeModal') removeModal: ModalDirective;
  
//allow to see promoteModal for promoteModal modal use
@ViewChild('promoteModal') promoteModal: ModalDirective;

//allow to see promoteModal for promoteModal modal use
@ViewChild('infoModal') infoModal: ModalDirective;


  //constructor function
  //input: adminservice as AdminServiceService import
  constructor(private adminservice: AdminServiceService) {  

  }

  //on page init fetch users data
  //input: false parameter for isAdmin
  //output: on success: create users table
  ngOnInit() {
  //call admin service to get user table
  this.adminservice.fetchUsersTable(false).subscribe(
    Data=>{
        this.users = Data.adminUsers;
          //  console.log(Data)
    })
}
  

  //fillter table (search)
  //input: array of users and search key.
  //output: show only if includes the key in our row.
  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj.firstName.includes(searchKey) || obj.lastName.includes(searchKey) || obj.email.includes(searchKey) ;
      });
    });
  }

  //Search init function
  //input: 
  //output: if we have search word, do fillter. if we don't, wait.
  search() {
    if (!this.searchText) {
      return this.users;
    }
    if (this.searchText) {
      return this.filterIt(this.users, this.searchText);
    }
  }
  //remove User modal
  //input: users data
  //output: setup user data and show modal
  removeUserModal(user){
    // console.log(user);
    this.created = user.created;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.removeModal.show();
  }
  //promote User modal
  //input: users data
  //output: setup user data and show modal
  promoteUserModal(user){
    // console.log(user);
    this.created = user.created;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.promoteModal.show();
  }

  //remove user function
  //input: users email
  //output: on success: remove user and hide, on fail: error msg
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
  //input: users email and true to admin
  //output: on success: promote user and hide, on fail: error msg
  changeUserStatus(){
    this.adminservice.changeUserStatus(this.email, true).subscribe(
      Data => {
        if(Data.success){
          // console.log("promoted " + this.email);
          this.promoteModal.hide();
        }
        else console.log(Data.message);
      }
    )
  }


  //Change user Status function 
  //input: user data
  //output: set user data to show
  userInfo(user){
    // console.log(user);
    this.created = user.created;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    
    ////post to server request
    //input: users email
    //output: on success: get user data and show, on fail: error msg
    this.adminservice.userInfo(this.email).subscribe(
      Data => {
        if(Data){
          // console.log(Data.userdata)
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
