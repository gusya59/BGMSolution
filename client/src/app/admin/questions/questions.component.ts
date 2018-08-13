import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-adminQuestions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class AdminQuestionsComponent implements OnInit {

  //table data inserted
  searchText: string;
  questionNumber: number;
  questionBody: string;
  answerNumber: number;
  answerBody: string;
  // question declaration
  questions:{
    questionNumber: number,
    questionBody: string
    answers:{
      answerNumber: number;
      answerBody: string;
    }
  }

  // question form
  questionBodyForm: FormGroup;
  // answer form
  answerBodyForm: FormGroup;


  constructor(private adminservice: AdminServiceService, private fb:FormBuilder ) {
    // create angular form
    this.questionBodyForm= fb .group({
      questionNumber: this.questionNumber,
      questionBody: this.questionBody
  });
    //create answer form
    this.answerBodyForm= fb.group({
        answerNumber: this.answerNumber,
        answerBody: this.answerBody
    });
   }

  ngOnInit() {
  //call admin service to get questions table
  this.adminservice.fetchQuestions().subscribe(
    Data=>{
        this.questions = Data.questions;
          //  console.log(Data)
    })
  }
// fillter search
  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].includes(searchKey);
      });
    });
  }
//preper search
  search() {
    if (!this.searchText) {
      return this.questions;
    }
    if (this.searchText) {
      return this.filterIt(this.questions, this.searchText);
    }
  }

  
// save question function new question body
  saveQuestion(body,number){
    console.log(body.value,number)
  }
  // save answer function new answer body
  saveAnswer(answerBody,answerNumber, questionBody){
    console.log(answerBody.value, answerNumber, questionBody)
  }

  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key])
  }

}
  
 
