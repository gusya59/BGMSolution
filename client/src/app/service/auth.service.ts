import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// Import of http service
import { HttpClient } from '@angular/common/http';

//interface for returning router resp
interface respData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//debug Logged in manual seassion overide
// false for logged out true for logged in.
  private loggedInStatus = false;


  constructor(private http: HttpClient, private router: Router) { }

  //get logged in replace property name with action
  get isLoggedIn(){
    return this.loggedInStatus;
  }

  //setting the logged in status after succsessful log or registration run
  setLoggedIn(status: boolean){
    this.loggedInStatus = status;
  }

  //get user info from backend HTTP
  UserLogin(InputEmail,InputPassword){
    //will get user info if correct
    const uri = 'http://www.mocky.io/v2/5b5616993200004546828145';
    // our object holding the login data
    const obj = {
      InputEmail: InputEmail,
      InputPassword: InputPassword
    };

    //post to data to server
    return this.http.post<respData>(uri,obj)
    console.log(InputEmail,InputPassword)
  }

  addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword,checkBox) {
    const uri = 'http://www.mocky.io/v2/5b561bd1320000934b828150';
    const obj = {
    
    inputfirstname: inputfirstname,
    inputlastname: inputlastname,
    inputEmail: inputEmail, 
    inputPassword: inputPassword,
    confirmPassword: confirmPassword,
    checkBox: checkBox
    };
    //post registration to server
    return this.http.post<respData>(uri, obj)

  }

}
