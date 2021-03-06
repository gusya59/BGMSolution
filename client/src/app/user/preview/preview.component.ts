import { UserPreviewService } from './../../service/user-preview.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



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
    setTimeout(() => {
    this.setupBudgetPage()
    },0);

    //Budgets on page load
    // setTimeout(() => {
    //   // console.log(this.platforms)
    //   },10000);
  }

  //set bar settings
  barSettings(){
    //define empty array
    var arr = new Array();
    //new array to build
    var widhtB = new Array();

    // loop and set push to array
    if(this.platforms){ 
      this.platforms.forEach((p) => {
      widhtB.push(+((p.platform_budget / this.budgetTotal) *100).toFixed(2) +"%");
    
      //puch to arr
      arr.push(this.getRandomColor());

      // console.log(arr);
      //set to our color array
      this.colorArray = arr; 
      })
    }
  
    //set width bar with our width
    this.widthBar = widhtB;
    // console.log(this.widthBar)
  };

  //function will initiate the budget values and bars
  setupBudgetPage(){
    // console.log("function called")
    //server up get request for data
    this.userPreview.getPreview().subscribe(data =>{

      // console.log(data)
      this.platforms = data.data.platforms_budget;
      this.budgetTotal = data.data.user_budget;
      // console.log(this.platforms,this.budgetTotal)
  
    // console.log(this.budget);
    //calc total budget
    this.barSettings();

    //remove decimals up to fixed 2 X.XX
    for(let p of this.platforms){
      p.platform_budget = +p.platform_budget.toFixed(2);
      
    }

  });
  }

  // randomize color

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
