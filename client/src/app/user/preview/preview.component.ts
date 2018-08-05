import { UserPreviewService } from './../../service/user-preview.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  // Define % of our table bars
  widthFacebook: string ="0%";
  widthInstagram: string ="0%";
  widthGoogleP : string ="0%";
  widthGoogleAdWords: string ="0%";
  widthGoogle: string ="0%";
  widthGoogleMybuissness: string ="0%";
  widthTwiiter: string ="0%";

  // Define the original budget per line
  
  budgetFacebook: number =0;
  budgetInstagram: number =0;
  budgethGoogleP : number =0;
  budgetGoogleAdWords: number =0;
  budgetGoogle: number =0;
  budgetGoogleMybuissness: number =0;
  budgetTwiiter: number =0;
  budgetTotal: number =0;

  //array of budgets
  budget = [this.budgetFacebook, this.budgetInstagram, this.budgethGoogleP, this.budgetGoogleAdWords, this.budgetGoogle, this.budgetGoogleMybuissness,
  this.budgetTwiiter];

  //array of width
  width = [this.widthFacebook, this.widthInstagram, this.widthGoogleP, this.widthGoogleAdWords, this.widthGoogle, this.widthGoogleMybuissness,
    this.widthGoogleMybuissness];
  
  
  constructor(private userPreview: UserPreviewService) { }

  ngOnInit() {
    //no server
    //on page load show bars with defalt 0
    this.widthFacebook;
    this.widthInstagram;
    this.widthGoogleP;
    this.widthGoogleAdWords;
    this.widthGoogle;
    this.widthGoogleMybuissness;
    this.widthTwiiter;



    //on page load show budget
    this.budgetFacebook;
    this.budgetInstagram;
    this.budgethGoogleP ;
    this.budgetGoogleAdWords;
    this.budgetGoogle;
    this.budgetGoogleMybuissness;
    this.budgetTwiiter;

    //server up get request for data
    this.userPreview.getPreview().subscribe(Data =>{
      
    this.budgetFacebook = Data.budgetFacebook;
    this.budgetInstagram = Data.budgetInstagram;
    this.budgethGoogleP = Data.budgethGoogleP;
    this.budgetGoogleAdWords = Data.budgetGoogleAdWords;
    this.budgetGoogle = Data.budgetGoogle;
    this.budgetGoogleMybuissness = Data.budgetGoogleMybuissness;
    this.budgetTwiiter = Data.budgetTwiiter;
    
  //store data in array of budgets
  this.budget = [this.budgetFacebook, this.budgetInstagram, this.budgethGoogleP, this.budgetGoogleAdWords, this.budgetGoogle, this.budgetGoogleMybuissness,
    this.budgetTwiiter];
      
    this.countTotal();
    console.log(Data);
    console.log(this.budget);
    this.calcPercentage();
  });
    


  }
  // functions will intercept server budgets and will generate table

  countTotal(){

    //loop to sum on budget
    for(let b in this.budget){
      this.budgetTotal += this.budget[b];
    }

  }

  calcPercentage(){
    //loop for width values and calc the %
    for(let b in this.width){
      this.width[b] = +((this.budget[b] / this.budgetTotal) *100).toFixed(2) +"%"
      console.log(this.width[b])
    }
    //set width values to display
  this.widthFacebook = this.width[0];
  this.widthInstagram = this.width[1];
  this.widthGoogleP = this.width[2];
  this.widthGoogleAdWords = this.width[3];
  this.widthGoogle = this.width[4];
  this.widthGoogleMybuissness = this.width[5];
  this.widthTwiiter = this.width[6];
    
  } 



}
