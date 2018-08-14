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
  nextQuestion: number;
  nextQuestionBody: string;

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
      const uri = 'http://www.mocky.io/v2/5b72bef33200000e0e3a7dd5';

      //object of numbers
      const obj = {
        questionNumber: questionNumber,
        answerNumber: answerNumber
      };
      return this.http.post<respData>(uri, obj)
    }

    // save question function new question body
    saveQuestion(questionNumber,questionBody){
      //recive data of questions
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
      //obj of question data
      const obj ={
        questionNumber: questionNumber,
        questionBody: questionBody
      }
      return this.http.post<respData>(uri,obj)

    }

    //save answer function new answer body
    saveAnswer(answerBody,answerNumber,questionNumber){
      //recive data of answer
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
      //obj of answer data
      const obj ={
        answerBody: answerBody,
        answerNumber: answerNumber,
        questionNumber: questionNumber
      }
      return this.http.post<respData>(uri,obj)

    }

    //save answer info function 
    updateAnswerData(facebook,twitter,instagram,googlePlus,myBusiness,adWords,nextQuestion){
      //recive data of answer
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
      //obj of answer data
      const obj ={
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        googlePlus: googlePlus,
        myBusiness: myBusiness,
        adWords: adWords,
        nextQuestion: nextQuestion
      }
      return this.http.post<respData>(uri,obj)

    }

    //delete question function
    deleteQuestion(questionNumber, questionBody){
      //recive data of answer
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
      //obj of answer data
      const obj ={
        questionNumber: questionNumber,
        questionBody: questionBody
      }
      return this.http.post<respData>(uri,obj)
    }

}
