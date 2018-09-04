import { ModalDirective } from 'angular-bootstrap-md';
import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

// admin table decleration
  admins: {
    created: string;
    firstName: string;  
    lastName: string;
    email: string;
  }[];

  //admin data decleration
  created: string;
  firstName: string;  
  lastName: string;
  email: string;



//allow to see removeModal for removeModal modal use
@ViewChild('removeModal') removeModal: ModalDirective;
//allow to see demoteModal for demoteModal modal use
@ViewChild('demoteModal') demoteModal: ModalDirective;
    

  //table data inserted
  searchText: string;

  constructor(private adminservice: AdminServiceService) { 

  }

//on page init fetch admin table
//input: on success: admin rank user table data
//output: send admin status "true" to server
  ngOnInit() {

  //call admin service to get admins table
    this.adminservice.fetchUsersTable(true).subscribe(
      Data=>{
          this.admins = Data.adminUsers; 
            //  console.log(this.admins)
      })

  }

  //fillter table (search)
  //input: array of admins and search key.
  //output: show only if includes the key in our row.
  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj.firstName.includes(searchKey) || obj.lastName.includes(searchKey) ;
      });
    });
  }

  //Search init function
  //input: 
  //output: if we have search word, do fillter. if we don't, wait.
  search() {
    if (!this.searchText) {   //if we didnt search show table
      return this.admins;
    }
    if (this.searchText) {    //if we searched call filter
      return this.filterIt(this.admins, this.searchText);
    }
  }

  //remove admin modal lunch
  //input: admin data
  //output: selected admin data to remove
  removeAdminModal(admin){
    // console.log(admin);
    this.created = admin.created;
    this.firstName = admin.firstName;
    this.lastName = admin.lastName;
    this.email = admin.email;
    //lunch modal
    this.removeModal.show();
  }

  //demote admin modal
  //input: admin data
  //output: show admin data to demote
  demoteAdminModal(admin){
    // console.log(admin);
    this.created = admin.created;
    this.firstName = admin.firstName;
    this.lastName = admin.lastName;
    this.email = admin.email;
    //lunch modal
    this.demoteModal.show();
  }

  //remove user function, send email and recive data
  //input:
  //output: on success: remove admin and hide modal, on fail: error.
  removeUser(){
    this.adminservice.removeUser(this.email).subscribe(
      Data => {
        if(Data.success){
          // console.log("removed " + this.email);
          this.removeModal.hide();
        }
        else console.log(Data.message);
      }
    )
  }

  //change user status function, demote admin to user
  //input: email and admin value false.
  //output: on success:demote admin and close modal, on fail: error.
  changeUserStatus(){
    this.adminservice.changeUserStatus(this.email, false).subscribe(
      Data => {
        if(Data.success){
          // console.log("demoted " + this.email);
          this.demoteModal.hide();
        }
        else console.log(Data.message);
      }
    )
  }

}
