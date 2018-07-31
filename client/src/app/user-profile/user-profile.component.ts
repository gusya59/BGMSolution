import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // inpage values
  b_name: string = "Davids Co";
  b_type: string = "Web Shop";
  mobile: string = "0501234585";
  phone: string = "046999745";
  city: string = "Nazareth illit";
  country: string = "Israel";
  address: string = "Hazoref 6, har yona";

  firstName: string ="David"
  lastName: string = "Berdichevsky"
  email: string = "DavidMD@bgm.com"
  
  
  // apply MDB Chart preference type doughnut
  public chartType:string = 'doughnut';
    // chart data inserted array: here we place the budgets
    public chartData:Array<any> = [300, 50, 100, 40, 120 , 400 , 80];

    // chart data inserted array: here we place the names
    public chartLabels:Array<any> = ['GoogleP', 'Instagram', 'Facebook', 'Twiiter',  'GoogleAdWords', 'Google', 'GoogleMybuissness'];

    // chart data inserted array: on hover change color and set chart color
    public chartColors:Array<any> = [{
        hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
        hoverBorderWidth: 0,
        backgroundColor: ["#e5110d", "#e21dd5", "#4250f4","#00bdf7", "#06aa0f", "#fffa00", "#8c8c8c" ], //same as set on lable
        hoverBackgroundColor: ["#e28583", "#db64d3", "#5c67ed", "#3392af", "#73ce78","#d3d043", "#d8d8d8" ]
    }];

    public chartOptions:any = {
        responsive: true
    };
    // chart hover and chart click: empty will put label and action nothing
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }

  constructor() { }

  ngOnInit() {
  }

}
