import { Injectable } from '@angular/core';
// Import of http service
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //get user info from backend HTTP
  getUserInfo(InputEmail,InputPassword){
    //will get user info if correct
    const uri = 'http://localhost:1234/signup/login';
    // our object holding the login data
    const obj = {
      InputEmail: InputEmail,
      InputPassword: InputPassword
    };

    //post to data to server
    return this.http.post(uri,obj)

    

  }

}
