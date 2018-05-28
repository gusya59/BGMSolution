import { Component, OnInit, NgModule } from '@angular/core';
//import users class
import { user } from './../../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

    //Property for the user
    private user:user;
    
  constructor() { }

  ngOnInit() {
        //Create a new user object
        this.user = new user({
          firstname:"",lastname:"",email:"", password: { pwd: "" , confirm_pwd: ""}, terms:false})
      
  }

}
