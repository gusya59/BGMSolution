import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component,ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { first } from '../../../node_modules/rxjs/operators';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //login form data decleration
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  routerPage = '/';

  //propertys
  isLoginError: boolean = false;

  //allow to see basicModal for error modal use
  @ViewChild('basicModal') basicModal: ModalDirective;

  //error msg decleration
  ErroMsg: string[];

    
  //login page constructor
  //input: auth as AuthService import, route as ActivatedRoute import, router as Router import and fb as FormBuilder import.
  //output: send admin status "true" to server
  constructor(private auth: AuthService, private route: ActivatedRoute,  private router: Router,private fb: FormBuilder){

   }

  //on login page init
  //input: 
  //output: validators init
  ngOnInit() {
    this.loginForm = this.fb.group({
      InputEmail: ['', [ Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      InputPassword: ['', [ Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z]).{7,}([0-9])$')]]
    });

    // reset login status
    this.auth.logout();

  }

  //get email and password from component and send it to auth
  // LoginUser(event){
  //   event.preventDefault(); 
  //   // constant holding the form valuse
  //   const target = event.target
  //   const InputEmail = target.querySelector('#InputEmail').value
  //   const InputPassword = target.querySelector('#InputPassword').value

  //   console.log(InputEmail,InputPassword)
  //   this.auth.UserLogin(InputEmail, InputPassword)
  //   .subscribe(resp => 
  //     { 
  //       if(resp.success){
  //       console.log(resp);
  //       this.auth.setLoggedIn(true);
  //       localStorage.setItem('token', resp.token);
  //       this.router.navigate(['user']);
  //     }
  //     else {
  //       this.ErroMsg =  resp.errors 
  //       this.isLoginError = true;
  //       this.basicModal.show();
  //     }


  //     });
  // }

  //get email and password from component and send it to auth
  //input: email and password
  //output: on success: redirect on fail: error msg

  login() {
    //set submittion to true
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    //request for login
    this.auth.UserLogin(this.loginForm.value.InputEmail, this.loginForm.value.InputPassword)
        .pipe(first())
        .subscribe(
            resp => {
              
              if(resp.success){
                // const tokenRecived = decode(resp.token);
                // console.log(resp);
                // this.auth.setLoggedIn(true);
                // console.log(decode(resp.token))
                
                // console.log(tokenRecived.isAdmin)
                this.isAdmin();
                this.router.navigate([this.returnUrl]);
              }
              else {
                this.ErroMsg =  resp.message; 
                this.isLoginError = true;
                this.basicModal.show();
                this.error = resp;
                this.loading = false;
              }
                
            })
  }

  //function to deal with admin login or user login
  //input: token
  //output: redirect if admin to admin and if user to user
  
  isAdmin(){
    const token = localStorage.getItem('token');
    const tokenPayLoad = decode(token);
    // console.log("isAdmin: " + tokenPayLoad.isAdmin)
    if(tokenPayLoad.isAdmin){
      // set admin to redirect
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
      this.routerPage = '/admin';
    } else{
      // set user to redirect
      this.routerPage = '/user';
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
    }
  }


}
