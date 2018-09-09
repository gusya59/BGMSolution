import { Component, OnInit } from '@angular/core';
// This component was removed, maybe will be avalible in future version

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  UserLogin(event){
    event.preventDefault();

    // constant holding the form valuse
    const target= event.target
    const InputPassword = target.querySelector('#InputPassword').value
    const checkBox = target.querySelector('#checkBox').value
    console.log(InputPassword,checkBox)
  }

}
