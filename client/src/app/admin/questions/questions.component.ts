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

  //table data inserted decleration
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

    //general data decleration

    nextQuestion: string;

    answer1Body:string;
    answer2Body: string;
    answer3Body: string;
    answer4Body: string;

    // answer Edit data decleration
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

    // platforms fixture decleration
    platforms: {
      platform_id: string,
      platform_name: string,
      platform_weight: number
    }[];

    //error msg decleration
    msgError: string;
  
  

  // question form decleration
  question_textForm: FormGroup;
  // answer form decleration
  answer_textForm: FormGroup;
  //add question form decleration
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

  //on page init fetch survey data
  //input: 
  //output: on success: place survey data 
  ngOnInit() {
    
  //call admin service to get questions table
  this.adminservice.fetchSurveyData().subscribe(
    Data=>{
      // console.log(Data);
        this.surveyData = Data.surveyData;
    })
  }

  
  //fillter table (search)
  //input: array of question and search key.
  //output: show only if includes the key in our row.
  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj.question_text.includes(searchKey) || obj.question_id.includes(searchKey);
      });
    });
  }

  //Search init function
  //input: 
  //output: if we have search word, do fillter. if we don't, wait.
  search() {
    if (!this.searchText) {
      return this.surveyData;
    }
    if (this.searchText) {
      return this.filterIt(this.surveyData, this.searchText);
    }
  }

  //save question function question body
  //input: question id and text
  //output: on fail: error msg
  saveQuestion(question_id,question_text){
    return this.adminservice.saveQuestion(question_id,question_text).subscribe(
      resp => {
        if(resp.success){
          // console.log("Posted");
          location.reload();
        }
        else{
          // console.log("Faild");
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    )
  }

  //save answer function new answer body
  //input: answer text.id and question id.
  //output: on fail: error msg
  saveAnswer(answer_text,answer_id, question_id){
    return this.adminservice.saveAnswer(answer_text,answer_id,question_id).subscribe(
      resp => {
        if(resp.success){
          // console.log("Posted");
          location.reload();
          
        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    )
  }

  //set asnswers obj into array
  //input: answer object
  //output: map to array 
  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key])
  }

  //edit question weights
  //input: answer question id and answer id.
  //output: on success: open modal to show data on fail: error msg
  editWeights(question_id, answer_id){
    
    // console.log("ans: " +answer_id,"quest: " + question_id);
    this.answer_id = answer_id;
    this.question_id = question_id;

    //get weights data from server
    this.adminservice.fetchPlatform(this.answer_id,this.question_id).subscribe(
      data =>{
        // console.log(data);
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

  //recive data from edit form to update answer
  //input: platform id and weight, question and answer id.
  //output: on success: updated data on fail: error msg
  updateAnswerData(platform_weight,platform_id,question_id,answer_id){
    
    return this.adminservice.updateAnswerData(platform_weight,platform_id,question_id,answer_id).subscribe(
      resp => {
        if(resp.success){
          // console.log("Posted: " +platform_weight.value , platform_id , question_id , answer_id);
        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    ) 
  }

  //edit form, next question
  //input: next question, question and answer id
  //output: on success: updated data on fail: error msg

  updateNextQuestion(next_question,question_id,answer_id){
    return this.adminservice.updateNextQuestion(next_question,question_id,answer_id).subscribe(
      resp => {
        if(resp.success){
          // console.log("Posted: " + next_question.value , question_id , answer_id);
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

  //show delete modal get id and text and showing modal 
  //input: question data
  //output: show model with data
  deleteQuestionShow(data){
    this.question_id = data.question_id;
    this.question_text = data.question_text,
    this.deleteQuestionModal.show();
  }

  //delete question get id and text and delete the question 
  //input: question id
  //output: on success: delete quesiton on fail: error msg
  deleteQuestion(question_id){
    return this.adminservice.deleteQuestion(question_id).subscribe(
      resp => {
        if(resp.success){
          // console.log("Deleted: "+ question_id);
          this.deleteQuestionModal.hide();
          location.reload();
        }
        else{
          this.msgError = resp.message;
          this.deleteQuestionModal.show();
        } 
      }
    )
  }

  //save new question, generatets new question
  //input: new question form values
  //output: on success: save question on fail: error msg

  saveNewQuestion(){
    console.log(this.newQuestionForm.value)
    return this.adminservice.saveNewQuestion(this.newQuestionForm.value).subscribe(
      resp => {
        if(resp.success){
          // console.log("Posted: " +this.newQuestionForm.value);
          this.addQuestionModal.hide();
          this.newQuestionForm.reset();
          //reload our component
          location.reload();
          
        }
        else{
          this.msgError = resp.message;
          this.errorModal.show();
        } 
      }
    )
  }

}
  
 
