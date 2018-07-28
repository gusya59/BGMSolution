
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
    inputfirstname: string;
    inputlastname: string;
    inputEmail: string;
    inputPassword: string;
    confirmPassword: string;
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
    this.inputfirstname = this.registrationFormGroup.value.inputfirstname;
    this.inputlastname = this.registrationFormGroup.value.inputlastname;
    this.inputEmail = this.registrationFormGroup.value.inputEmail;
    this.inputPassword = this.passwordFormGroup.value.inputPassword; 
    this.confirmPassword = this.passwordFormGroup.value.confirmPassword;
    this.checkBox = this.registrationFormGroup.value.checkBox;
    console.log(this.inputfirstname, this.inputlastname, this.inputEmail, this.inputPassword, this.confirmPassword, this.checkBox)

    if(this.registrationFormGroup.valid){
      //prevent browser default actions
      event.preventDefault()
      //run the registration function
      this.auth.addUser(this.inputfirstname, this.inputlastname, this.inputEmail, this.inputPassword, this.confirmPassword, this.checkBox)
      .subscribe(resp => 
        { 
          if(resp.success){
            this.auth.UserLogin(this.inputEmail, this.inputPassword);     
            console.log(resp);
            this.auth.setLoggedIn(true)
            this.router.navigate(['/signup/userSettings']);
          }
          else{
            this.errorMSG = resp.errors;
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