import { Component, OnInit } from '@angular/core';
// import company class
import { company } from './../../company';
//countries and citys
import {countryService} from './../../countryService';
import {country} from './../../country';
import {city} from './../../city';
//routing from location
import { Location } from '@angular/common'; 
//import settings file
import {SettingsService} from './../../service/settings.service'
//import router
import { Router } from '@angular/router'; 





@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})

export class UserSettingsComponent implements OnInit {
  //define object from the form
  inputbusinessName: string;
  selectedbusinesstype: string;
  selectedPre_mobile: string = "";
  mobile: string = "";
  SelectedPre_phone: string = "";
  phone: string = "";
  selectCountry: string;
  selectCity: string;
  inputAddress: string;
  budgetTotal: string;

      //Property for the user
      private company: company;
      // Property for pre_mobile
      private pre_mobile: string[];
      // property for pre_phone
      private pre_phone: string[];
      //business type
      private businessType: string[];

      selectedCountry: country = new country(0,'Israel');
      countries: country[];
      cities: city[];

  constructor(private _countryService: countryService, private location: Location, private settings: SettingsService, private router: Router) {
    //define list of countries to use from service
    this.countries = this._countryService.getCountries();
    }
    //define list of citis to use from service acording to country
    onSelect(countryid) {
      this.cities = this._countryService.getCities().filter((item) => item.countryid == countryid)
    }

  ngOnInit() {
    //pre-mobile settings
    this.pre_mobile =  ['050', '052', '053','054','055','058'];
    //pre-phone settings
    this.pre_phone =  ['02', '03', '04','05','06','07','08','077'];
    //business type settings
    this.businessType = ['store','Webstore','manufacture','retailer','mobile','electronics'];
    
  

    // //Create a new company object
    this.company = new company({
      b_name:"", b_type:"", mobile:"", phone: "", city:"",country:"", address:"", budgetTotal:""
    })
  }

    //user settings created from form
    userSettings(){
        //set company settings
      this.company.b_name = this.inputbusinessName;
      this.company.b_type = this.selectedbusinesstype;
      this.company.mobile = this.selectedPre_mobile.concat(this.mobile);
      this.company.phone = this.SelectedPre_phone.concat(this.phone);
      this.company.city = this.cities[+this.selectCity-1].name;  //unload city from list
      this.company.country = this.countries[+this.selectCountry-1].name;  //unload country from list
      this.company.address = this.inputAddress;
      this.company.budgetTotal = this.budgetTotal; //total company budget
      
       

      this.settings.userSettings(this.company)
      .subscribe(resp => 
        { 
          if(resp.success){     
            console.log(resp);
            this.router.navigate(['/signup/userSettings/questions']);
          }
          else {
            console.log(resp);
            for(let err of resp.errors)
            window.alert(err)
          }    
          });;
    }
    
    //router back button
    back() {
      this.location.back();
  }
}
