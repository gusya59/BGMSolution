import { Component, OnInit } from '@angular/core';
// import company class
import { company } from './../../company';
//countries and citys
import {countryService} from './../../countryService';
import {country} from './../../country';
import {city} from './../../city';
//routing from location
import { Location } from '@angular/common'; 






@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})

export class UserSettingsComponent implements OnInit {

      //Property for the user
      private company: company;
      // Property for pre_mobile
      private pre_mobile: string[];
      // property for pre_phone
      private pre_phone: string[];
      //Buisness type
      private BuisnessType: string[];

      selectedCountry: country = new country(0,'Israel');
      countries: country[];
      cities: city[];

  constructor(private _countryService: countryService, private location: Location) {
    this.countries = this._countryService.getCountries();
    }
    onSelect(countryid) {
      this.cities = this._countryService.getCities().filter((item) => item.countryid == countryid)
    }

  ngOnInit() {
    //pre-mobile settings
    this.pre_mobile =  ['050', '052', '053','054','055','058'];
    //pre-phone settings
    this.pre_phone =  ['02', '03', '04','05','06','07','08','077'];
     //Buisness type settings
     this.BuisnessType = ['store','Webstore','manufacture','retailer','mobile','electronics'];
    
  

    //Create a new company object
    this.company = new company({
      b_name:"", b_type:"", mobile:"", phone: "", address:"",
      pre_mobile: this.pre_mobile[0],
      pre_phone: this.pre_phone[0]
    })
  }

    //router back button
    back() {
      this.location.back();
  }
}
