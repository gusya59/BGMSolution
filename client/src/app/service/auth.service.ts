import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// Import of http service
import { HttpClient } from '@angular/common/http';

//interface for returning router resp
interface respData {
  success: boolean,
  message: string,
  status: number,
  errors: string[],
  token: string
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
    const uri = 'http://localhost:1234/signup/login';
    // our object holding the login data
    const obj = {
      email: InputEmail,
      password: InputPassword
    };

    //post to data to server
    return this.http.post<respData>(uri,obj)
    
  }

  addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword,checkBox) {
    const uri = 'http://localhost:1234/signup/registration';
    const obj = {
    
    firstName: inputfirstname,
    lastName: inputlastname,
    email: inputEmail, 
    password: inputPassword,
    passwordConfirmation: confirmPassword,
    checkBox: checkBox
    };
    //post registration to server
    console.log(obj)
    return this.http.post<respData>(uri, obj)

  }

}
