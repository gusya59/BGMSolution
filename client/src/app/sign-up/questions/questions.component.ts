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

//   //variables of questions. contains the selected option from our radioButton form
//   selectedEntry;
//   //define variables to use
//   private question: {
//     id: number;
//     body: string;
//     answers: {
//         id: number;
//         body: string;
//     }[]
// } = {
//    id: 0,       //define ID empty
//    body: null,  //define body as null
//    answers : []  //define empty string
// }

//server data structure declration
data: {
  question_id: string,
  question_text: string,
  nextQuestion: string,
  answers: [
    {
        answer_id: string,
        answer_text: string,
    }]
};

//server response next question to ask
nextQuestion: string

//selected answer flags
selectedEntry: {
  answer_id: string,
  answer_text: string
}

  constructor(private router: Router, private quest: QuestionService, private form: FormsModule) { }

  ngOnInit() {

    //Init the question form 
    this.quest.fetchQuestionQuestion("0").subscribe(
      data=> {
        if(data.success){
        this.data = {
            question_id: data.data.question_id,
            question_text: data.data.question_text,
            nextQuestion: data.data.nextQuestion,
            answers: data.data.answers
            }
          }
        else console.log(data)
      })
  }

  // catch selected entry from our radiobutton form
  onSelectionChange(question) {
    this.selectedEntry = question;
  }

  // run server request for new  question or route finish.
  QuestionAns(){
    // console.log("selected entery " + this.selectedEntry.answer_id)
    this.quest.addUserAnswer(this.data.question_id,this.data.question_text,this.selectedEntry.answer_id,this.selectedEntry.answer_text).subscribe(
      data=> {
        if(data.success){
          // console.log("data Recived from server: "+ data.nextQuestion)
          if(data.nextQuestion != "1"){
            this.quest.fetchQuestionQuestion(data.nextQuestion).subscribe(
              data=> {
                if(data.success){
                this.data = {
                    question_id: data.data.question_id,
                    question_text: data.data.question_text,
                    nextQuestion: data.data.nextQuestion,
                    answers: data.data.answers
                    }
                  }
                else console.log("Error getting question");
              })
          } else //survey ended with next question 1
          {
            this.router.navigate(['/signup/userSettings/questions/finish']);
          }

        }
        //on error
        else console.log("Error Qusetion");
      }
    )
  }
}



