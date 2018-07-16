import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
//import users class
import {UserService} from './../../user.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  angForm: FormGroup;

  constructor(private userservice: UserService, private fb: FormBuilder) { 
    this.createForm();
  }

  //user form
  createForm() {
    this.angForm = this.fb.group({
      inputfirstname: ['', Validators.required ],
      inputlastname: ['', Validators.required ],
      inputEmail: ['', Validators.required ],
      inputPassword: ['', Validators.required ],
      confirmPassword: ['', Validators.required ]
   });
  }

  addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword ) {
    this.userservice.addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword);
  }
  ngOnInit() {
        // //Create a new user object
        // this.user = new user({
        //   firstname:"",lastname:"",email:"", password: { pwd: "" , confirm_pwd: ""}, terms:false})
        
      
  }

}
