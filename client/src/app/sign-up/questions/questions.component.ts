import { FormsModule } from '@angular/forms';
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

  //variables of questions. contains the selected option from our radioButton form
  selectedEntry;
  //define variables to use
  private question: {
    id: number;
    body: string;
    answers: {
        id: number;
        body: string;
    }[]
} = {
   id: 0,       //define ID empty
   body: null,  //define body as null
   answers : []  //define empty string
}
    

  constructor(private router: Router, private quest: QuestionService, private form: FormsModule) { }

  ngOnInit() {

    //Init the question form 
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

  // catch selected entry from our radiobutton form
  onSelectionChange(question) {
    this.selectedEntry = question;
  }

  // run server request for new  question or route finish.
  QuestionAns(){
    console.log(this.selectedEntry)
    this.quest.getNextQuestion(this.question.id,this.selectedEntry).subscribe(
      data=> {
        //if we have next question
        if(data.status == "ok"){
          this.question = {
            id: data.question.id,
            body: data.question.body,
            answers: data.question.answers
            }
        }
        //no more quesiton remain
        else if(data.status == "done"){
          this.router.navigate(['/signup/userSettings/questions/finish']);
        }
        //on error
        else console.log(data.message)
      }
      
    )
  }
}
