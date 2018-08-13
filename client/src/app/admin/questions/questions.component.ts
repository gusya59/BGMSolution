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
  // question declaration
  questions:{
    questionNumber: number,
    questionBody: string
  }

  // question form
  questionBodyForm: FormGroup;


  constructor(private adminservice: AdminServiceService, private fb:FormBuilder ) {
    // create angular form
    this.questionBodyForm= fb .group({
      questionNumber: this.questionNumber,
      questionBody: this.questionBody
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

  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].includes(searchKey);
      });
    });
  }

  search() {
    if (!this.searchText) {
      return this.questions;
    }
    if (this.searchText) {
      return this.filterIt(this.questions, this.searchText);
    }
  }

  saveQuestion(body,id){
    console.log(body.value,id)
  }


}
