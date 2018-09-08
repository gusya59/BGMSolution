import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";

interface respData {
  budgetFacebook: number;
  budgetInstagram: number;
  budgethGoogleP: number ;
  budgetGoogleAdWords: number;
  budgetGoogle: number;
  budgetGoogleMybuissness: number;
  budgetTwiiter: number;
  
  message: {
    user_budget: number,
    platforms_budget: [
        {
            platform_id: string,
            platform_name: string,
            platform_budget_percent: number,
            platform_budget: number
        }];
      }

  platforms:[
    {
      platform_id: string,
      platform_name: string,
      platform_budget: number
    }
  ];
}

@Injectable({
  providedIn: 'root'
})
export class UserPreviewService {

  constructor(private http: HttpClient) { }

  //get preview info from backend HTTP

  getPreview(){

    //will get user info if correct
    const uri = 'http://localhost:1234/budget/calculateBudget';

    //object with email payload
    const obj = {
      user_email: jwt_decode(localStorage.getItem('token')).userID
    }
    console.log(obj)
    //get data from server
    return this.http.post<respData>(uri,obj)
    
  }
}
