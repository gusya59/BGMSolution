import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import {ConnectionService} from './connection.service'

interface respData {
  budgetFacebook: number;
  budgetInstagram: number;
  budgethGoogleP: number ;
  budgetGoogleAdWords: number;
  budgetGoogle: number;
  budgetGoogleMybuissness: number;
  budgetTwiiter: number;
  
  data: {
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

  constructor(private http: HttpClient, public url: ConnectionService) { }

  //import string from service
  urlstring =  this.url.httpurl;

  //get preview info from backend HTTP
  //input:
  //output: request to server carring an payload with object
  getPreview(){

    //will get user info if correct
    const uri = this.urlstring + '/budget/fetchBudgetData';

    //object with email payload
    const obj = {
      user_email: jwt_decode(localStorage.getItem('token')).userID
    }
    // console.log(obj)
    //get data from server
    return this.http.post<respData>(uri,obj)
    
  }
}
