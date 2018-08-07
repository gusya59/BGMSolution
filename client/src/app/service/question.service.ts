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
  status: string,
  message: string,
  question : {
    id: number;
    body: string;
    answers: {
      id: number;
      body: string;
    }[]
  }
}

@Injectable({
  providedIn: 'root'
})


export class QuestionService {

  constructor(private http: HttpClient) { }

  //get question info from backend HTTP

  getQuestion(){
    //will get user info if correct
    const uri = 'http://www.mocky.io/v2/5b69df38320000ed11af5e7e';


    //get data from server
    return this.http.get<respData>(uri)
    
  }
  //get next question from server
  getNextQuestion(question_Num,answere_Num){
    //will get user info if correct
    const uri = 'http://www.mocky.io/v2/5b69df38320000ed11af5e7e';
    const obj ={
      question_Num: question_Num,
      answere_Num: answere_Num
    }

    //get data from server
    return this.http.post<respData>(uri,obj)
  }
}
