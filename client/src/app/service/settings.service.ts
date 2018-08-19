import { Injectable } from '@angular/core';
// Import of http service
import { HttpClient } from '@angular/common/http';
//router
import { Router } from '@angular/router';

//interface for returning router resp
interface respData {
  success: boolean,
  message: string
  // array of platforms
  platformsArray: [{        
    platform_id: string,
    platform_name: string,
    platform_weight: number,
    selected: boolean}];
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  

  constructor(private http: HttpClient, private router: Router) {}


  userSettings(company){
    console.log(company);
    const uri = 'http://localhost:1234/signup/usersettings';
    const obj = {
    
      business_name: company.b_name,
      business_type: company.b_type,
      mobile: company.mobile,
      phone: company.phone,
      city: company.city,
      country: company.country,
      address: company.address,
      budget: company.budgetTotal
      // token: localStorage.getItem('token') // will be used if necesery
    };

    console.log(obj)
    //post registration to server
    return this.http.post<respData>(uri, obj)

  }

  getUserPlatforms(){
    //uri for Server
    const uri = 'http://www.mocky.io/v2/5b77c8fb2e00000e00864bb9';
    const obj = {

    }
    return this.http.post<respData>(uri, obj)
  }

  chosenPlatforms(platforms){
     //uri for Server
     const uri = 'http://www.mocky.io/v2/5b77c8fb2e00000e00864bb9';

     console.log(platforms)
     return this.http.post<respData>(uri, platforms)
  }



}
