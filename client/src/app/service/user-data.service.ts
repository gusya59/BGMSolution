import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Data that will be pulled or bushed to known user
interface respData {
  success: string;
  message: string;
  userdata:{
    firstName: string,
    lastName: string,
    email: string,
    business_name: string,
    business_type: string,
    mobile: string,
    phone: string,
    city: string,
    country: string,
    address: string,
    old_password: string,
    password: string,
    passwordConfirmation: string,
    success: boolean,
    message: string,
    budget: number
  }
}

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor(private http: HttpClient) { }

  getUserData(){
    //will get user info if correct
    const uri = 'http://localhost:1234/user/profile';
    //payload obj
    const obj = {
      token: localStorage.getItem('token')
    };

    //get data from server
    return this.http.post<respData>(uri,obj)
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

  //change user data acordingly reciveds user obj
  //name,lastname and user settings
  userDataChanged(user){
    //posting new user data 
    const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
    return this.http.post<respData>(uri,user); //will subscripe succsess or faill
  }
  
}
