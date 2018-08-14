import { ModalDirective } from 'angular-bootstrap-md';
import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

// admin table
  admins: {
    created: string;
    firstName: string;  
    lastName: string;
    email: string;
  }[];
  //admin data
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

  ngOnInit() {

  //call admin service to get admins table
    this.adminservice.fetchAdminTable().subscribe(
      Data=>{
          this.admins = Data.adminUsers; 
             console.log(this.admins)
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

  //remove admin modal
  removeAdminModal(admin){
    console.log(admin);
    this.created = admin.created;
    this.firstName = admin.firstName;
    this.lastName = admin.lastName;
    this.email = admin.email;
    this.removeModal.show();
  }

  //demote admin
  demoteAdminModal(admin){
    console.log(admin);
    this.created = admin.created;
    this.firstName = admin.firstName;
    this.lastName = admin.lastName;
    this.email = admin.email;
    this.demoteModal.show();
  }

  //remove user function
  removeUser(){
    this.adminservice.removeUser(this.email).subscribe(
      Data => {
        if(Data.success){
          console.log("removed " + this.email);
          this.removeModal.hide();
        }
        else console.log(Data.message);
      }
    )
  }

    //Change user Status function
    changeUserStatus(){
      this.adminservice.changeUserStatus(this.email).subscribe(
        Data => {
          if(Data.success){
            console.log("demoted " + this.email);
            this.demoteModal.hide();
          }
          else console.log(Data.message);
        }
      )
    }

}
