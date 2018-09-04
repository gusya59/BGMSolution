import { UserPreviewService } from './../../service/user-preview.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forEach } from '../../../../node_modules/@angular/router/src/utils/collection';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {




  // Define the original budget per line
  
  platforms:[
    {
      platform_id: string,
      platform_name: string,
      platform_budget: number
    }
  ];

  //define bar width

  widthBar: string [];

  //define budget total
  budgetTotal: number =0;

  //define color array
  colorArray: string[];
  
  
  constructor(private userPreview: UserPreviewService) { }

  ngOnInit() {
    
    //Budgets on page load
    this.setupBudgetPage();


  }

  //set bar settings
  barSettings(){
    //define empty array
  var arr = new Array();
    //new array to build
    var widhtB = new Array();

    // loop and set push to array

  this.platforms.forEach((p) => {
    widhtB.push(+((p.platform_budget / this.budgetTotal) *100).toFixed(2) +"%");

    //puch to arr
    arr.push(this.getRandomColor());

    // console.log(arr);
    //set to our color array
    this.colorArray = arr; 
  }
  )
  //set width bar with our width
  this.widthBar = widhtB;
  // console.log(this.widthBar)
};

  
  // functions will intercept server budgets and will generate table

  countTotal(){
    
    //loop and calculate budget Total
    this.platforms.forEach((p)=>{
      this.budgetTotal = this.budgetTotal + p.platform_budget;
      // console.log(p.platform_budget)
    }
    
  )
  // console.log("total: " + this.budgetTotal)
  }

  setupBudgetPage(){
    //server up get request for data
    this.userPreview.getPreview().subscribe(Data =>{
      this.platforms = Data.platforms;
      
  
    this.countTotal();

    // console.log(this.budget);
    //calc total budget
    this.barSettings();

  });
  }

  // randomize color

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
