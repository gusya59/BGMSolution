import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Injectable()
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

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
    console.log(obj)
    this.http.post(uri, obj)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/userSettings']); //Won't redirect @david 13:29
          },
           (err) => {
            console.log(err);
           }
      ); 
  }
}