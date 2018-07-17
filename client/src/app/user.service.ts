import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword) {
    const uri = 'http://localhost:4200/signup/registration';
    const obj = {

    inputfirstname: inputfirstname,
    inputlastname: inputlastname,
    inputEmail: inputEmail, 
    inputPassword: inputPassword,
    confirmPassword: confirmPassword
    };
    this.http.post(uri, obj)
        .subscribe(res => console.log('Done'));
  }
}