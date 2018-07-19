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
 
    registrationFormGroup: FormGroup;
    passwordFormGroup: FormGroup;
    
  constructor(private userservice: UserService, private fb: FormBuilder) { 
    this.passwordFormGroup = this.fb.group({
      inputPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });
    this.registrationFormGroup = this.fb.group({
      passwordFormGroup: this.passwordFormGroup
    });
  }

  addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword ) {
    this.userservice.addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword),console.log("done");
  }

  ngOnInit() {
         
  }
  

}

class RegistrationValidator {
  static validate(registrationFormGroup: FormGroup) {
      let inputPassword = registrationFormGroup.controls.inputPassword.value;
      let confirmPassword = registrationFormGroup.controls.confirmPassword.value;


      if (confirmPassword !== inputPassword) {
          return {
              doesMatchPassword: true
          };
      }

      return null;

  }
}