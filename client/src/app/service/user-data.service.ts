import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Data that will be pulled or bushed to known user
interface respData {
  firstName: string,
  lastName: string,
  email: string,
  b_name: string,
  b_type: string,
  mobile: string,
  phone: string,
  city: string,
  country: string,
  address: string,
  old_password: string,
  password: string,
  passwordConfirmation: string,
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor(private http: HttpClient) { }

  getUserData(){
    //will get user info if correct
    const uri = 'http://www.mocky.io/v2/5b60a5d92f00001939461a4c';


    //get data from server
    return this.http.get<respData>(uri)
  }

  //password change function assembly. 
  passChange(password, oldPassword, confirmPassword){
    //will get user info if correct
    const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';

    //object with old password, new password and confirmation
    const obj = {
      password: password,
      oldPassword: oldPassword,
      confirmPassword: confirmPassword
    };

    //post data to server
    return this.http.post<respData>(uri,obj); //wil subscribe success, message.
  }
  
}
