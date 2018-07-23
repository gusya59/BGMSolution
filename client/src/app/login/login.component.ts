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


    this.auth.getUserInfo(InputEmail, InputPassword)
    .subscribe(
      data => {
        if(data.success){
          //redirect to User-Home
          this.router.navigate(['/user']);
        }
        else
          window.alert(data.message)
      }
    )
    console.log(InputEmail,InputPassword)
  }
}
