
import { Injectable, Output } from '@angular/core';
// Import of http service
import { HttpClient } from '@angular/common/http';
import { map } from '../../../node_modules/rxjs/operators';
import {JwtHelperService } from '@auth0/angular-jwt'
import {ConnectionService} from './connection.service'

//interface for returning router resp
interface respData {
  success: boolean,
  message: string,
  status: number,
  errors: string[],
  token: string,
  Headers: any
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
//debug Logged in manual seassion overide
// false for logged out true for logged in.
  // private loggedInStatus = false;

  //component construction function
  //input: HttpClient imported as http and JwtHelperService imported as jwtHelper
  //output:  
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public url: ConnectionService) { }

  //import string from service
  urlstring =  this.url.httpurl;


  //function to check seasion
  //input:
  //output: true if not expired or false if do expired
  public isAuthenticated(): boolean{
    //get token
    const token = localStorage.getItem('token');

    //check if the token still alive
    return !this.jwtHelper.isTokenExpired(token);
  }
  
  //get logged in replace property name with action
  // get isLoggedIn(){
  //   return this.loggedInStatus;
  // }

  //setting the logged in status after succsessful log or registration run
  // setLoggedIn(status: boolean){
  //   this.loggedInStatus = status;
  // }

  //get user info from backend HTTP
  //input: user inputed email and password
  //output: success or fail
  UserLogin(InputEmail: string, InputPassword: string){
    //will get user info if correct
    const uri = this.urlstring + '/signup/login';
    // our object holding the login data
    const obj = {
      email: InputEmail,
      password: InputPassword
    };

    return this.http.post<any>(uri,obj)
    .pipe(map(Data => {
        // login successful if there's a jwt token in the response
        if (Data && Data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(Data.token));
            // console.log(Data)
            
        }
        return Data;
    }));
    
  }

  //logout function delete token and redirect
  //input:
  //output:
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  } 

  //add user registration function
  //input: users firstname, last name, email, password and confirmation and check box for aggrement
  //output: success or fail
  addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword,checkBox) {
    const uri = this.urlstring + '/signup/registration';
    const obj = {
    
    firstName: inputfirstname,
    lastName: inputlastname,
    email: inputEmail, 
    password: inputPassword,
    passwordConfirmation: confirmPassword,
    termsConfirmCheck: checkBox
    };
    //post registration to server
    
    //header manage
    // var reqHeader = new HttpHeaders({'content-Type': 'application/x-www-urlencoded'});
    // return this.http.post<respData>(uri, obj, {headers: reqHeader})

    return this.http.post<respData>(uri, obj).pipe(map(Data => {
      // login successful if there's a jwt token in the response
      if (Data && Data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          
          localStorage.setItem('token', JSON.stringify(Data.token));
          // console.log(Data)
      }
      return Data;
  }));
  }

  //delete user function
  //input: user password
  //output: success or fail
  deleteUser(password){
    const uri = this.urlstring + '/user/remove';
    const obj ={
      token: localStorage.getItem("token"),
      password: password
    }
    return this.http.post<respData>(uri,obj)
    
  }

}
