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
  inputBuisnessName: string;
  selectedBuisnesstype: string;
  selectedPre_mobile: string = "";
  mobile: string = "";
  SelectedPre_phone: string = "";
  phone: string = "";
  selectCountry: string;
  selectCity: string;
  inputAddress: string;

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
    //Buisness type settings
    this.BuisnessType = ['store','Webstore','manufacture','retailer','mobile','electronics'];
    
  

    //Create a new company object
    this.company = new company({
      b_name:"", b_type:"", mobile:"", phone: "", city:"",country:"", address:"",
    })
  }

    //user settings event

    userSettings(){
        //set company settings
      this.company.b_name = this.inputBuisnessName;
      this.company.b_type = this.selectedBuisnesstype;
      this.company.mobile = this.selectedPre_mobile.concat(this.mobile);
      this.company.phone = this.SelectedPre_phone.concat(this.phone);
      this.company.city = this.cities[+this.selectCity-1].name;  //unload city from list
      this.company.country = this.countries[+this.selectCountry-1].name;  //unload country from list
      this.company.address = this.inputAddress;
      
       

      this.settings.userSettings(this.company)
      .subscribe(resp => 
        { 
          if(resp.success){     
            console.log(resp);
            this.router.navigate(['/signup/questions']);
          }
          else {
            window.alert(resp.message)
          }    
          });;
    }
    
    //router back button
    back() {
      this.location.back();
  }
}
