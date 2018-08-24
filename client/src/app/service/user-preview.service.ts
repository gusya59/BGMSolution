import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface respData {
  budgetFacebook: number;
  budgetInstagram: number;
  budgethGoogleP: number ;
  budgetGoogleAdWords: number;
  budgetGoogle: number;
  budgetGoogleMybuissness: number;
  budgetTwiiter: number;
  
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
    const uri = 'http://www.mocky.io/v2/5b77f5c32e00004b00864be9';

    //get data from server
    return this.http.get<respData>(uri)
    
  }
}
