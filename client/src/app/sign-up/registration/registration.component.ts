
import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
//import auth class
import { AuthService } from './../../service/auth.service';
//router
import { Router } from '@angular/router';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
    angForm: FormGroup;
    errorMSG: string[];
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    checkBox: boolean;


    // our regisration form data collection
    registrationFormGroup: FormGroup;
    // group of password and confiramtion
    passwordFormGroup: FormGroup;
    
  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { 

    //password validator stat function
    this.passwordFormGroup = this.fb.group({
      inputPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      //request for password validation
      validator: RegistrationValidator.validate.bind(this)
    });

    //other validators
    this.registrationFormGroup = this.fb.group({
      inputfirstname: ['', Validators.required],
      inputlastname: ['', Validators.required],
      inputEmail: ['',[ Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
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
    console.log(this.firstName, this.lastName, this.email, this.password, this.passwordConfirmation, this.checkBox)

    if(this.registrationFormGroup.valid){
      //prevent browser default actions
      event.preventDefault()
      //run the registration function
      this.auth.addUser(this.firstName, this.lastName, this.email, this.password, this.passwordConfirmation, this.checkBox)
      .subscribe(resp => 
        { 
          if(resp.success){
            this.auth.UserLogin(this.email, this.password);     
            console.log(resp);
            this.auth.setLoggedIn(true);
            localStorage.setItem('token', resp.token);
            this.router.navigate(['/signup/userSettings']);
          }
          else{
            this.errorMSG = resp.errors;
            localStorage.setItem('token',"TETSTESTSETSETESTEST");
            this.router.navigate(['/Inputerror']);
          }    
          });;
        
    }

  }

  ngOnInit() {

  }


  

}

// password validator for registration front end form
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