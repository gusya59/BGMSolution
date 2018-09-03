import { ModalDirective } from 'angular-bootstrap-md';
import { AdminServiceService } from '../../service/admin-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-adminQuestions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class AdminQuestionsComponent implements OnInit {

  //table data inserted
  searchText: string;
  question_id: string;
  question_text: string;
  answer_id: string;
  answer_text: string;

  // question declaration
  surveyData: {
      question_id: string,
      question_text: string,
    }[];

    //general data
    nextQuestion: string;

    answer1Body:string;
    answer2Body: string;
    answer3Body: string;
    answer4Body: string;

    // answer Edit data
    data: {
      answers: {
        answer_id: string;
        answer_text: string;
        next_question: string;
        platforms: {
          platform_id: string,
          platform_name: string,
          platform_weight: number
        }[];
      }[];
    }

    // platforms fixture to our needs
    platforms: {
      platform_id: string,
      platform_name: string,
      platform_weight: number
    }[];

    //error msg
    msgError: string;
  
  

  // question form
  question_textForm: FormGroup;
  // answer form
  answer_textForm: FormGroup;
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
   }

  ngOnInit() {
    
  //call admin service to get questions table
  this.adminservice.fetchSurveyData().subscribe(
    Data=>{
      console.log(Data);
        this.surveyData = Data.surveyData;
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
      return this.surveyData;
    }
    if (this.searchText) {
      return this.filterIt(this.surveyData, this.searchText);
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
      data =>{
        console.log(data);
        if(data.success){
          this.data = data.data;
          this.editModal.show();
          // walk around known angular 6 issue
          // get the next question value out of array with only one parameter
          // console.log(this.data.answers[this.data.answers.length-1].next_question);
          this.nextQuestion = this.data.answers[this.data.answers.length-1].next_question;
          //fetch platforms out of backend response
          this.platforms = this.data.answers[this.data.answers.length-1].platforms;
        }
        else{
          this.msgError = data.message;
          this.errorModal.show();
        }
      }
    )
    
  }

  //recive data from edit form
  updateAnswerData(platform_weight,platform_id,question_id,answer_id){
    
    return this.adminservice.updateAnswerData(platform_weight,platform_id,question_id,answer_id).subscribe(
      resp => {
        if(resp.success){
          console.log("Posted: " +platform_weight.value , platform_id , question_id , answer_id);
        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    )
    
  }

  //update edit form next question
  updateNextQuestion(next_question,question_id,answer_id){
    return this.adminservice.updateNextQuestion(next_question,question_id,answer_id).subscribe(
      resp => {
        if(resp.success){
          console.log("Posted: " + next_question.value , question_id , answer_id);
          // fix angular 6 known issue, modal content wont destory on hide()
          // this.answer.next_question.value = '';
          this.editModal.hide();  

        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    )
  }

  // show delete modal get id and text and showing modal 
  deleteQuestionShow(data){
    this.question_id = data.question_id;
    this.question_text = data.question_text,
    this.deleteQuestionModal.show();
  }

  // delete question get id and text and delete the question
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
  // save new question button generatets new question
  saveNewQuestion(){
    console.log(this.newQuestionForm.value)
    return this.adminservice.saveNewQuestion(this.newQuestionForm.value).subscribe(
      resp => {
        if(resp.success){
          console.log("Posted: " +this.newQuestionForm.value);
          this.addQuestionModal.hide();
          this.newQuestionForm.reset();
        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    )
  }

}
  
 
