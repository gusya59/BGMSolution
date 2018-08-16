import { ModalDirective } from 'angular-bootstrap-md';
import { AdminServiceService } from '../../service/admin-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-adminQuestions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class AdminQuestionsComponent implements OnInit {

  //table data inserted
  searchText: string;
  question_id: number;
  question_text: string;
  answer_id: number;
  answer_text: string;
  // question declaration
  questions:{
    question_id: number,
    question_text: string
    answers:{
      answer_id: number;
      answer_text: string;
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
    nextquestion_text: string;
    answer1Body:string;
    answer2Body: string;
    answer3Body: string;
    answer4Body: string;

    // answer Edit data
    answer: {
      answer_id: string;
      answer_text: string;
      next_question: string;
      platforms: {
        platform_id: string,
        platform_name: string,
        platform_weight: number
      }
    }

    //error msg
    msgError: string;
  
  

  // question form
  question_textForm: FormGroup;
  // answer form
  answer_textForm: FormGroup;
  //add question form
  newQuestionForm: FormGroup;
  //answer DAta form
  answerData: FormGroup;


  //allow to see editModal for answers modal use
  @ViewChild('editModal') editModal: ModalDirective;
  //allow to see errorModal for removeModal modal use
  @ViewChild('errorModal') errorModal: ModalDirective;
  //allow to see deleteQuestionModal to delete question
  @ViewChild('deleteQuestionModal') deleteQuestionModal: ModalDirective;
  // allow to see addQuestionModal to add question
  @ViewChild('addQuestionModal') addQuestionModal: ModalDirective;
  


  constructor(private adminservice: AdminServiceService, private fb:FormBuilder ) {


    // create question body form
    this.question_textForm= fb .group({
      question_id: this.question_id,
      question_text: this.question_text
    });
    //create answer form
    this.answer_textForm= fb.group({
        answer_id: this.answer_id,
        answer_text: this.answer_text
    });
    //create question form
    this.newQuestionForm = fb.group({
      question_text: this.question_text,
      answer1Body: this.answer1Body,
      answer2Body: this.answer2Body,
      answer3Body: this.answer3Body,
      answer4Body: this.answer4Body
    });
    //create question weights form
    this.answerData = fb.group({


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
  saveQuestion(question_text,question_id){
    return this.adminservice.saveQuestion(question_text,question_id).subscribe(
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
  saveAnswer(answer_text,answer_id, question_id){
    return this.adminservice.saveAnswer(answer_text,answer_id,question_id).subscribe(
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
  editWeights(question_id, answer_id){
    
    console.log("ans: " +answer_id,"quest: " + question_id);
    this.answer_id = answer_id;
    this.question_id = question_id;

    //get weights data from server
    this.adminservice.fetchPlatform(this.answer_id,this.question_id).subscribe(
      resp =>{
        console.log(resp);
        if(resp.success){
          this.answer = resp;
          console.log()
          console.log(this.answer)
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
  updateAnswerData(platform_weight,platform_id,question_id,answer_id){
    
    return this.adminservice.updateAnswerData(platform_weight,platform_id,question_id,answer_id).subscribe(
      resp => {
        if(resp.success){
          console.log("Posted: " +platform_weight.value , platform_id , question_id , answer_id);
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
    this.question_id = data.question_id;
    this.question_text = data.question_text,
    this.deleteQuestionModal.show();
  }

  // delete question
  deleteQuestion(question_id, question_text){
    return this.adminservice.deleteQuestion(question_id, question_text).subscribe(
      resp => {
        if(resp.success){
          console.log("Deleted: "+ question_id);
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
  
 
