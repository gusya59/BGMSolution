import { Injectable } from '@angular/core';
// Import of http service
import { HttpClient } from '@angular/common/http';
//router
import { Router } from '@angular/router';
//jwt decoder handler 
import jwt_decode from 'jwt-decode';
import {ConnectionService} from './connection.service'

//interface for returning router resp
interface respData {
  success: boolean,
  message: string,
  errors: string[],
  data: {
    user_email: string,
    platforms: [
        {
          _id: string,
          platform_id: string,
          platform_name: string,
          platform_selected: boolean
        }
      ]
    }
  }

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  

  constructor(private http: HttpClient, private router: Router, public url: ConnectionService) {}

  //import string from service
  urlstring =  this.url.httpurl;

  //userSettings application to server, will send user compnay settings
  //input: company settings
  //output: request to server carring an payload with object
  userSettings(company){
    const uri = this.urlstring + '/signup/usersettings';
    const obj = {
    
      business_name: company.b_name,
      business_type: company.b_type,
      mobile: company.mobile,
      phone: company.phone,
      city: company.city,
      country: company.country,
      address: company.address,
      budget: company.budgetTotal,
      token: localStorage.getItem('token') // will be used if necesery
    };

    // console.log(obj)
    //post registration to server
    return this.http.post<respData>(uri, obj)

  }

  //extract user platforms initiated in DB
  //input:
  //output: request to server carring an payload with object
  fetchPlatformList(){
    //uri for Server
    const uri = this.urlstring + '/user/fetchPlatformList';
    const obj = {
      user_email: jwt_decode(localStorage.getItem("token")).userID
    }
    return this.http.post<respData>(uri, obj)
  }

  //updated users platform list with selected values
  //input: platforms array holding ourplatforms
  //output: request to server carring an payload with object
  updatePlatformsSelection(platformForm){
     //uri for Server
     const uri = this.urlstring + '/user/updatePlatformsSelection';
    // return data to server
    const obj = {
      user_email: jwt_decode(localStorage.getItem("token")).userID,
      platforms: platformForm.platforms
    }
    //  console.log(obj)
     return this.http.post<respData>(uri, obj)
  }



}
