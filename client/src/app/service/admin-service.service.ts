import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from '../../../node_modules/rxjs/operators';

//interface class for known resp data
interface respData {
  success: string;
  message: string;
  regUserAmount: number;
  adminUserAmount: number;
  //admin table decleration
  adminUsers: {
    created: string;
    firstName: string;  
    lastName: string;
    email: string;
  }[];
  //users table decleration
  users: {
    created: string;
    firstName: string;  
    lastName: string;
    email: string;
  }[];
  //user info
  b_name: string;
  b_type: string;
  mobile: string; 
  phone: string; 
  city: string; 
  country: string; 
  address: string; 
  totalBudget: number;

  // question declaration
  questions:{
    questionNumber: number,
    questionBody: string
    answers:{
      answerNumber: number;
      answerBody: string;
    }
  }


  //platform decleration
  facebook: number;
  twitter: number;
  instagram: number;
  googlePlus: number;
  myBusiness: number;
  adWords: number;

}

@Injectable({
  providedIn: 'root'
})


export class AdminServiceService {
  

  constructor(private http: HttpClient) { }

  // admin service info bar. get server data
  generalInformation(){
    //will get info if correct
    // console.log("requested qet!")
    const uri = 'http://localhost:1234/admin/info';

      // send empty obj
      const obj = {
        token: localStorage.getItem('token')
      };

    //get data from server
    return this.http.post<respData>(uri,obj)

  }

    // admin service admins. get admin data table
    fetchAdminTable(){
      //will get info if correct
      const uri = 'http://localhost:1234/admin/admins';
      console.log("dfbjsfuk");
        // send empty obj
        const obj = {
          token: localStorage.getItem('token')
        };
      //get data from server
      return this.http.post<respData>(uri,obj)
  
    }

    // admin service users. get user data table
    fetchUsersTable(){
      //will get info if correct
      const uri = 'http://www.mocky.io/v2/5b6e26d93100001000781957';
        // send empty obj
        const obj = {
          token: localStorage.getItem('token')
        };
      //get data from server
      return this.http.post<respData>(uri,obj)
  
    }

    // remove user service
    removeUser(email){
      //will post info if correct
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
        // send email in obj
        const obj = {
          email: email,
          token: localStorage.getItem('token')
      };
      return this.http.post<respData>(uri,obj);

    }

    // Change user status service (admin/user)
    changeUserStatus(email){
      //will post info if correct
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';

        // send email in obj
        const obj = {
          email: email,
          token: localStorage.getItem('token')
      };
      return this.http.post<respData>(uri,obj);

    }

    //request user info
    userInfo(email){
      //will post info if correct
      const uri = 'http://www.mocky.io/v2/5b6b223932000065073732f4';
       
        // send email in obj
        const obj = {
          email: email,
          token: localStorage.getItem('token')
      };
      return this.http.post<respData>(uri,obj);
    }

    //request questions
    fetchQuestions(){
      //will post questions if correct
      const uri = 'http://www.mocky.io/v2/5b71b8643200005519f36f67';

        // send email in obj
        const obj = {
          token: localStorage.getItem('token')
      };
      return this.http.post<respData>(uri,obj);
    }

    //request platform
    fetchPlatform(answerNumber,questionNumber){
      //will post fetchPlatform if correct
      const uri = 'http://www.mocky.io/v2/5b72bc4b32000073193a7dc0';

      //object of numbers
      const obj = {
        questionNumber: questionNumber,
        answerNumber: answerNumber
      };
      return this.http.post<respData>(uri, obj)
    }
}
