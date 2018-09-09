import { ActivatedRoute } from '@angular/router';
//Bootstrap
import { ModalDirective } from 'angular-bootstrap-md';

import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
//import auth class
import { AuthService } from './../../service/auth.service';
//router
import { Router } from '@angular/router';
import { first } from '../../../../node_modules/rxjs/operators';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  //initiated usable values
    angForm: FormGroup;
    errorMSG: string[];
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    checkBox: boolean;
    returnUrl: string;

  // propertys
  isLoginError: boolean = false;
  //allow to see basicModal for error modal use
  @ViewChild('basicModal') basicModal: ModalDirective;

  //vars
  ErroMsg: string[];

    // our regisration form data collection
    registrationFormGroup: FormGroup;
    // group of password and confiramtion
    passwordFormGroup: FormGroup;
    
  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router , private route: ActivatedRoute) { 

    //password validator stat function
    this.passwordFormGroup = this.fb.group({
      inputPassword: ['', [ Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z]).{7,}([0-9])$')]], //at least 8 characters, one upper and one lower case, numbers - ,{7,}->more than 8. it's counting from 0
      confirmPassword: ['',[ Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z]).{7,}([0-9])$')]]
    }, {
      //request for password validation
      validator: RegistrationValidator.validate.bind(this)
    });

    //other validators
    this.registrationFormGroup = this.fb.group({
      inputfirstname: ['',[ Validators.required,Validators.pattern('^[A-Za-z]+$')]],//only alphabet 
      inputlastname: ['',[ Validators.required,Validators.pattern('^[A-Za-z]+$')]],//only alphabet 
      inputEmail: ['',[ Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],//check if email correct
      checkBox: ['', Validators.required],
      passwordFormGroup: this.passwordFormGroup
    });
  }
  //RegisterUser funciton 
  RegisterUser() {
    //set values
    this.firstName = this.registrationFormGroup.value.inputfirstname;
    this.lastName = this.registrationFormGroup.value.inputlastname;
    this.email = this.registrationFormGroup.value.inputEmail;
    this.password = this.passwordFormGroup.value.inputPassword; 
    this.passwordConfirmation = this.passwordFormGroup.value.confirmPassword;
    this.checkBox = this.registrationFormGroup.value.checkBox;
    // console.log(this.firstName, this.lastName, this.email, this.password, this.passwordConfirmation, this.checkBox)

    if(this.registrationFormGroup.valid){
      //prevent browser default actions
      event.preventDefault()
      //run the registration function
      this.auth.addUser(this.firstName, this.lastName, this.email, this.password, this.passwordConfirmation, this.checkBox)
      .pipe(first()).subscribe(resp => 
        { 
          if(resp.success){     
            console.log(resp);
            // this.auth.setLoggedIn(true);
            this.router.navigate([this.returnUrl]);
          }
          else{
            this.ErroMsg =  resp.errors 
            this.isLoginError = false;
            this.basicModal.show();
          }    
          });;
        
    }

  }

  ngOnInit() {
    // reset login status
    this.auth.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/signup/userSettings';

  }


  

}

// password validator for registration front end form

class RegistrationValidator {

  //input: form group carring the passwords
  //output: if valid => true else false
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