import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//define interface class for managing response from server
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
    const uri = 'http://www.mocky.io/v2/5b583b503000000206fe4e01';


    //get data from server
    return this.http.get<respData>(uri)
    
  }
}
