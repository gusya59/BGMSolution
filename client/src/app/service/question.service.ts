import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Created using mockServer
// { "status": "ok",
// "message": "test msg server David The KING!",
// "question" : {
//                   "id": "1",
//                   "body": "test msg server David The KING",
//                   "answers": [{
//                                 "id": "1",
//                                 "body": "test ans1 כולם"
//                               },
//                               {
//                                 "id": "2",
//                                 "body": "test ans2 יודעים"  
//                               },
//                               {
//                                 "id": "3",
//                                 "body": "test ans3 שדוד"  
//                               },
//                               {
//                                 "id": "4",
//                                 "body": "test ans4 מלך!"  
//                               }
//                               ]
//                 }
// }


//define interface class for managing response from serverץ
interface respData {
  //server data structure declration
  success: boolean,
  data: {
    question_text: string,
    question_id: string,
    nextQuestion: string,
    answers: [
      {
          answer_id: string,
          answer_text: string,
      }]
  };
}

@Injectable({
  providedIn: 'root'
})


export class QuestionService {

  constructor(private http: HttpClient) { }

  //get question info from backend HTTP

  getQuestion(question_id,question_text,answer_id,answer_text){
    
    //will get user info if correct
    const uri = 'http://localhost:1234/user/addUserAnswer';
    const obj ={
      token: localStorage.getItem('token'),
      question_id: question_id,
      question_text: question_text,
      answer_id: answer_id,
      answer_text: answer_text  
    }

    console.log(obj)
    //get data from server
    return this.http.post<respData>(uri,obj)
    
  }
  
  //get first question from server
  getfirstQuestion(question_id,question_text,answer_id,answer_text){
    //will get user info if correct
    const uri = 'http://localhost:1234/survey/fetchQuestion';
    const obj ={
      token: localStorage.getItem('token'),
      question_id: question_id,
      question_text: question_text,
      answer_id: answer_id,
      answer_text: answer_text  
    }

    console.log(obj)
    //get data from server
    return this.http.post<respData>(uri,obj)
  }
}
