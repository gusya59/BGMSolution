import { ModalDirective } from 'angular-bootstrap-md';
import { AdminServiceService } from './../../service/admin-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '../../../../node_modules/@angular/forms';

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

    //general data
    nextQuestion: number;
    nextQuestionBody: string;
    answer1Body:string;
    answer2Body: string;
    answer3Body: string;
    answer4Body: string;

    //error msg
    msgError: string;
  
  

  // question form
  questionBodyForm: FormGroup;
  // answer form
  answerBodyForm: FormGroup;
  //add question form
  newQuestionForm: FormGroup;


  //allow to see editModal for answers modal use
  @ViewChild('editModal') editModal: ModalDirective;
  //allow to see errorModal for removeModal modal use
  @ViewChild('errorModal') errorModal: ModalDirective;
  //allow to see deleteQuestionModal to delete question
  @ViewChild('deleteQuestionModal') deleteQuestionModal: ModalDirective;
  // allow to see addQuestionModal to add question
  @ViewChild('addQuestionModal') addQuestionModal: ModalDirective;
  


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
    this.newQuestionForm = fb.group({
      questionBody: this.questionBody,
      answer1Body: this.answer1Body,
      answer2Body: this.answer2Body,
      answer3Body: this.answer3Body,
      answer4Body: this.answer4Body
    })
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
  saveQuestion(questionBody,questionNumber){
    return this.adminservice.saveQuestion(questionBody,questionNumber).subscribe(
      resp => {
        if(resp.success){
          console.log("Posted");
        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    )
  }

  // save answer function new answer body
  saveAnswer(answerBody,answerNumber, questionNumber){
    return this.adminservice.saveAnswer(answerBody,answerNumber,questionNumber).subscribe(
      resp => {
        if(resp.success){
          console.log("Posted");
        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    )
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
          this.nextQuestion = resp.nextQuestion;
          this.nextQuestionBody = resp.nextQuestionBody;
        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        }
      }
    )
    this.editModal.show();
  }

  //recive data from edit form
  updateAnswerData(facebook,twitter,instagram,googlePlus,myBusiness,adWords,nextQuestion){
    return this.adminservice.updateAnswerData(facebook,twitter,instagram,googlePlus,myBusiness,adWords,nextQuestion).subscribe(
      resp => {
        if(resp.success){
          console.log("Posted");
          this.editModal.hide();
        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    )
    
  }

  // show delete modal 
  deleteQuestionShow(data){
    this.questionNumber = data.questionNumber;
    this.questionBody = data.questionBody,
    this.deleteQuestionModal.show();
  }

  // delete question
  deleteQuestion(questionNumber, questionBody){
    return this.adminservice.deleteQuestion(questionNumber, questionBody).subscribe(
      resp => {
        if(resp.success){
          console.log("Deleted: "+ questionNumber);
          this.deleteQuestionModal.hide();
        }
        else{
          this.msgError = resp.message;
          this.deleteQuestionModal.show();
        } 
      }
    )
  }
  // save new question button
  saveNewQuestion(){
    console.log(this.newQuestionForm.value)
    return this.adminservice.saveNewQuestion(this.newQuestionForm.value).subscribe(
      resp => {
        if(resp.success){
          console.log("Posted: " +this.newQuestionForm.value);
          this.addQuestionModal.hide();
        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    )
  }

}
  
 
