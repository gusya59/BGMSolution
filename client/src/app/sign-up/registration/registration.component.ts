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
    inputfirstname: string;
    inputlastname: string;
    inputEmail: string;
    inputPassword: string;
    confirmPassword: string;
  constructor(private userservice: UserService, private fb: FormBuilder) { }
////all this stuff/// we are weren't shure what it does and if it necessary 
  // user form
  // createForm() {
  //   this.angForm = this.fb.group({
  //     inputfirstname: ['', Validators.required ],
  //     inputlastname: ['', Validators.required ],
  //     inputEmail: ['', Validators.required ],
  //     inputPassword: ['', Validators.required ],
  //     confirmPassword: ['', Validators.required ]
  //  });
  // }

  addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword ) {
    this.userservice.addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword),console.log("done");
  }
  ngOnInit() {
        // //Create a new user object
        // this.user = new user({
        //   firstname:"",lastname:"",email:"", password: { pwd: "" , confirm_pwd: ""}, terms:false})
        
      
  }

}
