import { ModalDirective } from 'angular-bootstrap-md';
import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  //platform decleration
    facebook: number;
    twitter: number;
    instagram: number;
    googlePlus: number;
    myBusiness: number;
    adWords: number;
  

  // question form
  questionBodyForm: FormGroup;
  // answer form
  answerBodyForm: FormGroup;
  //answer Edit Form
  editFormGroup: FormGroup;

  //allow to see removeModal for removeModal modal use
  @ViewChild('editModal') editModal: ModalDirective;


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
    this.editFormGroup= fb.group({
      facebook : this.facebook,
      twitter: this.twitter,
      instagram: this.instagram,
      googlePlus: this.googlePlus,
      myBusiness: this.myBusiness,
      adWords: this.adWords,
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
  saveAnswer(answerBody,answerNumber, questionNumber){
    console.log(answerBody.value, answerNumber, questionNumber)
  }

  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key])
  }

  // edit question weights
  editWeights(questionNumber, answerNumber){
    console.log("ans: " +answerNumber,"quest: " + questionNumber);
    this.answerNumber = answerNumber;
    this.questionNumber = questionNumber;

    //get weights data from server
    this.adminservice.fetchPlatform(this.answerNumber,this.questionNumber).subscribe(
      resp =>{
        if(resp.success){
          this.facebook = resp.facebook;
          this.twitter = resp.twitter;
          this.instagram = resp.instagram;
          this.googlePlus = resp.googlePlus;
          this.myBusiness = resp.myBusiness;
          this.adWords = resp.adWords;
        }
      }
    )
    this.editModal.show();
  }

}
  
 
