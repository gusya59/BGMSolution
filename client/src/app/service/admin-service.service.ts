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
  userdata:{
    business_name: string;
    business_type: string;
    mobile: string; 
    phone: string; 
    city: string; 
    country: string; 
    address: string; 
    budget: number;
  }

 

  // question declaration
  //survay data contains question information
  surveyData:[
    {
      question_id: number,
      question_text: string,
      answers:[
        {
          answer_id: number;
          answer_text: string;
        }
      ]
    }
  ];


  //platform decleration
  answer_id: string;
  answer_text: string;
  next_question: string;
  platforms: {
    platform_id: string,
    platform_name: string,
    platform_weight: number
  }

  facebook: number;
  twitter: number;
  instagram: number;
  googlePlus: number;
  myBusiness: number;
  adWords: number;
  nextQuestion: number;
  nextquestion_text: string;

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


    ///find user by permission
    //input: token, permission type: true for admin, false for regular user
    //output: object with all the relevant users
    fetchUsersTable(isAdminPer){
      //will get info if correct
      const uri = 'http://localhost:1234/admin/admins';
        // send empty obj
        const obj = {
          isAdminPer: isAdminPer,
          token: localStorage.getItem('token')
        };
      //get data from server
      return this.http.post<respData>(uri,obj)
  
    }

    // remove user service
    removeUser(email){
      //will post info if correct
      const uri = 'http://localhost:1234/admin/admins/remove';
        // send email in obj
        const obj = {
          email: email,
          token: localStorage.getItem('token')
      };
      return this.http.post<respData>(uri,obj);

    }

    // Change user status service (admin/user)
    changeUserStatus(email,isAdminPer){
      //will post info if correct
      const uri = 'http://localhost:1234/admin/admins/changePermissions';

        // send email in obj
        const obj = {
          email: email,
          isAdminPer: isAdminPer
      };
      console.log(obj)
      return this.http.post<respData>(uri,obj);

    }

    //request user info
    userInfo(email){
      //will post info if correct
      const uri = 'http://localhost:1234/admin/users/info';
       
        // send email in obj
        const obj = {
          email: email
      };
      return this.http.post<respData>(uri,obj);
    }

    //request questions
    fetchSurveyData(){
      //will post questions if correct
      const uri = 'http://localhost:1234/survey/fetchSurveyData';

        // send email in obj
        const obj = {
          token: localStorage.getItem('token')
      };
      return this.http.post<respData>(uri,obj);
    }

    //request platform
    fetchPlatform(answer_id,question_id){
      //will post fetchPlatform if correct

      const uri = 'http://www.mocky.io/v2/5b7534a32e00005300535f3c';
      //object of numbers
      const obj = {
        question_id: question_id,
        answer_id: answer_id
      };
      return this.http.post<respData>(uri, obj)
    }

    // save question function new question body
    saveQuestion(question_id,question_text){
      //recive data of questions
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
      //obj of question data
      const obj ={
        question_id: question_id,
        question_text: question_text
      }
      return this.http.post<respData>(uri,obj)

    }

    //save answer function new answer body
    saveAnswer(answer_text,answer_id,question_id){
      //recive data of answer
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
      //obj of answer data
      const obj ={
        answer_text: answer_text,
        answer_id: answer_id,
        question_id: question_id
      }
      return this.http.post<respData>(uri,obj)

    }

    //save answer info function 
    updateAnswerData(platform_weight,platform_id,question_id,answer_id){
      //recive data of answer
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
      //obj of answer data
      const obj = {
        platform_weight: platform_weight.value,
        platform_id: platform_id,
        question_id: question_id,
        answer_id: answer_id
      }
      return this.http.post<respData>(uri,obj)

    }

    //save nextquestion to server
    updateNextQuestion(next_question,question_id,answer_id){
      //recive data of answer
    const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
    //obj of answer data
    const obj = {
      next_question: next_question.value,
      question_id: question_id,
      answer_id: answer_id,
      
    }
    return this.http.post<respData>(uri,obj)

  }

    //delete question function
    deleteQuestion(question_id, question_text){
      //recive data of answer
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
      //obj of answer data
      const obj ={
        question_id: question_id,
        question_text: question_text
      }
      return this.http.post<respData>(uri,obj)
    }
//save new question to server
    saveNewQuestion(newQuestion){
      //recive data of quesiton
      const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
      //obj of question data
      const obj ={
        newQuestion: newQuestion
      }
      // console.log(obj)
      return this.http.post<respData>(uri,obj)
    }

}
