import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from '../../../node_modules/rxjs/operators';
import {ConnectionService} from './connection.service'

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
  surveyData:
    {
      question_id: string,
      question_text: string,
      answers:[
        {
          answer_id: string;
          answer_text: string;
        }
      ]
    }[];

  //answer decleration
  data: {
    answers: {
      answer_id: string;
      answer_text: string;
      next_question: string;
      platforms: {
        platform_id: string,
        platform_name: string,
        platform_weight: number
      }[];
    }[];
  }

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
  
  //component construct
  //input: HttpClient imported as http
  //output: 
  constructor(private http: HttpClient, public url: ConnectionService) { }

  //import string from service
  urlstring =  this.url.httpurl;

  //admin service info bar. get server data
  //input: 
  //output: server general server information
  
  generalInformation(){
    //will get info if correct
    // console.log("requested qet!")
    const uri = this.urlstring + '/admin/info';

      // send empty obj
      const obj = {
        token: localStorage.getItem('token')
      };

    //get data from server
    return this.http.post<respData>(uri,obj)

  }


    ///find user by permission
    //input: permission type: true for admin, false for regular user
    //output: object with all the relevant users
    fetchUsersTable(isAdminPer){
      //will get info if correct
      const uri = this.urlstring + '/admin/admins';
        // send empty obj
        const obj = {
          isAdminPer: isAdminPer,
          token: localStorage.getItem('token')
        };
      //get data from server
      return this.http.post<respData>(uri,obj)
  
    }

    // remove user service
    //input: user email
    //output: payload with success of fail
    removeUser(email){
      //will post info if correct
      const uri = this.urlstring + '/admin/admins/remove';
        // send email in obj
        const obj = {
          email: email,
          token: localStorage.getItem('token')
      };
      return this.http.post<respData>(uri,obj);

    }

    // Change user status service (admin/user)
    //input: user email and is Admin
    //output: payload with success or fail
    changeUserStatus(email,isAdminPer){
      //will post info if correct
      const uri = this.urlstring + '/admin/admins/changePermissions';

        // send email in obj
        const obj = {
          email: email,
          isAdminPer: isAdminPer
      };
      // console.log(obj)
      return this.http.post<respData>(uri,obj);

    }

    //request user info
    //input: user email
    //output: payload with user info
    userInfo(email){
      //will post info if correct
      const uri = this.urlstring + '/admin/users/info';
       
        // send email in obj
        const obj = {
          token: localStorage.getItem("token"),
          email: email
      };
      return this.http.post<respData>(uri,obj);
    }

    //request questions
    //input:
    //output: payload with survey data
    fetchSurveyData(){
      //will post questions if correct
      const uri = this.urlstring + '/survey/fetchSurveyData';
      
        // send email in obj
        const obj = {
          token: localStorage.getItem('token')
      };
      return this.http.post<respData>(uri,obj);
    }

    //request platform
    //input: answer id and question id
    //output: payload with platforms data
    fetchPlatform(answer_id,question_id){
      //will post fetchPlatform if correct

      const uri = this.urlstring + '/survey/fetchPlatform';
      //object of numbers
      const obj = {
        question_id: question_id,
        answer_id: answer_id
      };
      return this.http.post<respData>(uri, obj)
    }

    // save question function new question body
    //input: question id and question text
    //output: payload with success or faill
    saveQuestion(question_id,question_text){
      //recive data of questions
      const uri = this.urlstring + '/survey/saveQuestion';
      //obj of question data
      const obj ={
        question_id: question_id,
        question_text: question_text
      }
      // console.log(obj)
      return this.http.post<respData>(uri,obj)

    }

    //save answer function new answer body
    //input: answer id answer text and question id
    //output: payload with success or faill
    saveAnswer(answer_text,answer_id,question_id){
      //recive data of answer
      const uri = this.urlstring + '/survey/saveAnswer';
      //obj of answer data
      const obj ={
        answer_text: answer_text,
        answer_id: answer_id,
        question_id: question_id
      }
      
      return this.http.post<respData>(uri,obj)

    }

    //save answer info function 
    //input: platform weight, platform id , question id and answer id and platform name
    //output: payload with success or fail
    updateAnswerData(platform_weight,platform_id,question_id,answer_id,platform_name){
      //recive data of answer
      const uri = this.urlstring + '/survey/savePlatform';
      //obj of answer data
      const obj = {
        question_id: question_id,
        answer_id: answer_id,
        platforms:{
          platform_weight: platform_weight.value,
          platform_id: platform_id,
          platform_name: platform_name
        }
      }
      // console.log(obj)
      return this.http.post<respData>(uri,obj)

    }

    //save nextquestion to server
    //input: next question, question id and answer id
    //output: payload with success or fail
    updateNextQuestion(next_question,question_id,answer_id){
    //recive data of answer
    const uri = this.urlstring + '/survey/saveNextQuestion';
    //obj of answer data
    const obj = {
      next_question: next_question.value,
      question_id: question_id,
      answer_id: answer_id, 
    }
    // console.log(obj)
    return this.http.post<respData>(uri,obj)

  }

    //delete question function
    //input: question id
    //output: payload with success or fail.
    deleteQuestion(question_id){
      //recive data of answer
      const uri = this.urlstring + '/survey/removeQuestion';
      //obj of answer data
      const obj ={
        question_id: question_id
      }
      return this.http.post<respData>(uri,obj)
    }

    //save new question to server
    //input: new question
    //output: payload with success or fail.
    saveNewQuestion(newQuestion){
      //recive data of quesiton
      const uri = this.urlstring + '/survey/addNewQuestion';
      //obj of question data will be generated firsts footprint of our question. will be proccessed at server.
      // console.log(newQuestion)
      const obj ={
        question_id: "0",
        question_text: newQuestion.question_text,
            answers: [{
                answer_id: "0",
                answer_text:  newQuestion.answer1Body,
                next_question: "0"
            },
            {
                answer_id: "0",
                answer_text: newQuestion.answer2Body,
                next_question: "0"
            },        {
                answer_id: "0",
                answer_text: newQuestion.answer3Body,
                next_question: "0"
            },        {
                answer_id: "0",
                answer_text: newQuestion.answer4Body,
                next_question: "0"
            }]
      }
      console.log(obj)
      return this.http.post<respData>(uri,obj)
    }

}
