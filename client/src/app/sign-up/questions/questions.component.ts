import { QuestionService } from './../../service/question.service';
// http service
import { HttpClient } from '@angular/common/http';
// router service
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  //define variables to use
    private question : {
      id: number;
      body: string;
      answers: {
        id: number;
        body: string;
      }[]
    }

  constructor(private router: Router, private http: HttpClient, private quest: QuestionService) { }

  ngOnInit() {
    // this.question = {
    //   id:1,
    //   body:"Test body",
    //   answeres: [{id:1,body:"test1"},{id:2,body:"test2"},{id:3,body:"test3"},{id:4,body:"test4"}]
    // }
    
    this.quest.getQuestion().subscribe(
      data=> {
        this.question = {
            id: data.question.id,
            body: data.question.body,
            answers: data.question.answers
            }
          }
    )
    }
  }

  // QuestionAns(){
  //   console.log(this.question)
  //   this.quest.getQuestion().subscribe(
  //     data=> {
  //       if(data.status == "ok"){

  //       }
  //     }
      
  //   )
  // }


