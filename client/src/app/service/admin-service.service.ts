import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//interface class for known resp data
interface respData {
  success: string;
  message: string;
  numUsers: number;
  numAdmins: number;
  //admin table decleration
  admins: {
    id: string;
    firstName: string;  
    lastName: string;
    email: string;
  }[];
  //users table decleration
  users: {
    id: string;
    firstName: string;  
    lastName: string;
    email: string;
  }[];

  
}

@Injectable({
  providedIn: 'root'
})


export class AdminServiceService {
  

  constructor(private http: HttpClient) { }

  // admin service info bar. get server data
  generalInformation(){
    //will get info if correct
    const uri = 'http://www.mocky.io/v2/5b6e1499310000580078193d';

    //get data from server
    return this.http.get<respData>(uri)

  }

    // admin service admins. get admin data table
    fetchAdminTable(){
      //will get info if correct
      const uri = 'http://www.mocky.io/v2/5b6e1aab3100000e00781947';
  
      //get data from server
      return this.http.get<respData>(uri)
  
    }

    // admin service users. get user data table
    fetchUsersTable(){
      //will get info if correct
      const uri = 'http://www.mocky.io/v2/5b6e26d93100001000781957';
  
      //get data from server
      return this.http.get<respData>(uri)
  
    }
}
