import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword,checkBox) {
    const uri = 'http://localhost:1234/signup/registration';
    const obj = {
    
    inputfirstname: inputfirstname,
    inputlastname: inputlastname,
    inputEmail: inputEmail, 
    inputPassword: inputPassword,
    confirmPassword: confirmPassword,
    checkBox: checkBox
    };
    return this.http.post(uri, obj)
        .subscribe(
          data => console.log(data),
          err => console.log(err),
          () => console.log('yay')
        )
  }

  logemail(inputEmail){
    const uri = 'http://localhost:1234/signup/login';
    const obj = {
      inputEmail:inputEmail
    };
    return this.http.post(uri, obj)
        .subscribe(
          data => console.log(data),
          err => console.log(err),
          () => console.log('yay')
        )      
  }

  logpassword(inputPassword){
    const uri = 'http://localhost:1234/signup/login';
    const obj = {
      inputPassword: inputPassword
    };
    return this.http.post(uri, obj)
        .subscribe(
          data => console.log(data),
          err => console.log(err),
          () => console.log('yay')
        )      
  }
}