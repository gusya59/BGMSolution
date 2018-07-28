import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {

   }

  ngOnInit() {
  }

  //get email and password from component and send it to auth
  LoginUser(event){
    event.preventDefault(); 
    // constant holding the form valuse
    const target = event.target
    const InputEmail = target.querySelector('#InputEmail').value
    const InputPassword = target.querySelector('#InputPassword').value

    console.log(InputEmail,InputPassword)
    this.auth.UserLogin(InputEmail, InputPassword)
    .subscribe(resp => 
      { 
        if(resp.success){
        console.log(resp);
        this.auth.setLoggedIn(true)
        this.router.navigate(['user']);
      }
      else {
        window.alert(resp.errors)
      }


      });
  }
}
