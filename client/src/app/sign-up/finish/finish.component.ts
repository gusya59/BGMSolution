import { SettingsService } from './../../service/settings.service';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

    //define time variable
    timer: number = 15000;
    
    // array of platforms
    platformsArray: [{
      _id: string,
      platform_id: string,
      platform_name: string,
      platform_selected: boolean
    }];

    //platforms form
    // platforms array
    platforms: FormArray;
    // platform group
    platformForm: FormGroup;


  constructor(public router: Router, public fb: FormBuilder, public settings: SettingsService ) {}

  ngOnInit() {

    // init array of platforms
    this.getArray();

    // run form creation function on page init
    this.createForm();

    // platforms will hold data array remove object at 0 to start as checked , loop platforms
    this.platforms = this.getData();
    // console.log(this.platforms);
    while (this.getData().length) {
      this.platforms.removeAt(0)
    }


    
    // Auto redirect off
  //   setTimeout((router) => {
  //     this.router.navigate(['/user']);
  // }, this.timer);  //30s

  }
  
  get formData() { return <FormArray>this.platformForm.get('platforms'); }

  // get array function and build it.
  getArray(){
    // console.log("fired")
    this.settings.fetchPlatformList().subscribe(
      data=>{
        // console.log("resp Recived")
        if(data.success){
          // console.log(data);
          this.platformsArray = data.data.platforms;
          // console.log(this.platformsArray)
          // console.log(this.platformsArray.length)

          //create the array
          for (let d of this.platformsArray) {
            this.addMore(d);
          }
          
        }
        else 
        console.log("Error");
      }
      
    )
  }

  // get data from our Form as platforms
  //output: build form array 
  getData() {
    return <FormArray>this.platformForm.get('platforms') ;
  }

  // loop and add platforms to array
  addMore(d) {
    this.getData().push(this.buildPlatforms(d));
  }
  

  // form creation function call buildPlaforms function to generate dynamic data structure
  //input: 
  //output: recive data from server and build and platform array
  createForm() {
    this.platformForm = this.fb.group({
      platforms: this.fb.array([this.buildPlatforms({
        _id: null,
        platform_id: null,
        platform_name: null,
        platform_selected: null
      })])
    });
  }

  // build data platforms function
  //input: data contains platforms
  //output: form build with data
  
  buildPlatforms(data) {
    // if data not arravied recived all null
    if (!data) {
      data = {
        _id: null,
        platform_id: null,
        platform_name: null,
        platform_selected: null
      }
    }
    // else get data
    return this.fb.group({
      _id: data._id,
      platform_id: data.platform_id,
      platform_name: data.platform_name,
      platform_selected: data.platform_selected
    });
  }

  // submit function to server
  //output: post selected data to server
  submit() {
    //send json to server if success redirect if error hold and log
    // console.log(this.platformForm.value)
    this.settings.updatePlatformsSelection(this.platformForm.value).subscribe(
      resp => {
      if(resp.success){
        this.router.navigate(['/user']);
      }
      else console.log("error")
      })
    // console.log(this.platformForm.value)
  }

 
}
