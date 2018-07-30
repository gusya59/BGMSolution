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


  constructor() { }

  ngOnInit() {
  }

}
