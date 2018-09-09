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
    budget: number
  }
}

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor(private http: HttpClient) { }

  //request server for user data
  //input:
  //output: request to server carring an payload with object
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
  //input: users email, password and oldpassword to grant access
  //output: request to server carring an payload with object 
  changePassword(email, password, oldPassword){
    //will get user info if correct
    const uri = 'http://localhost:1234/user/changePassword';

    //object with old password, new password and confirmation
    const obj = {
      newPassword: password,
      password: oldPassword,
      email: email
    };

    //post data to server
    return this.http.post<respData>(uri,obj); //wil subscribe success, message.
  }

  //change user data acordingly reciveds user obj
  // will prevent change of critical data as email
  //input: name,lastname and user settings
  //output: request to server carring an payload with object
  changeUserData(user){
    //posting new user data 
    const uri = 'http://localhost:1234/user/changeUserData';
    //obj contains response from user and token
    const obj = {
      token: localStorage.getItem('token'),
      firstName: user.firstName,
      lastName: user.lastName,
      business_name: user.b_name,
      business_type: user.b_type,
      mobile: user.mobile,
      phone: user.phone,
      city: user.city,
      country: user.country,
      address: user.address,
      budget: user.TotalBudget
    }
    // console.log(obj);
    return this.http.post<respData>(uri,obj); //will subscripe succsess or faill
  }
  
}
