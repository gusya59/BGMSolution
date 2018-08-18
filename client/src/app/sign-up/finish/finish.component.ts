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
    // //platform const
    platformsArray =  [
      {
        platform_id: 'P1',
        platform_name: "Facebook",
        platform_weight: 0.5,
        selected: true
      },
      {
        platform_id: 'P2',
        platform_name: "Instragram",
        platform_weight: 0.7,
        selected: true
      },
      {
        platform_id: 'P3',
        platform_name: "Google",
        platform_weight: 0.2,
        selected: true
      },      
      {
        platform_id: 'p4',
        platform_name: "AdWords",
        platform_weight: 0.6,
        selected: true
      },
      {
        platform_id: 'p5',
        platform_name: "Google My Business",
        platform_weight: 0.15,
        selected: true
      }
    ];

    //platforms form
    // platforms array
    platforms: FormArray;
    // platform group
    platformForm: FormGroup;


  constructor(private router: Router, private fb: FormBuilder ) {}

  ngOnInit() {

    // run form creation function on page init
    this.createForm();

    // platforms will hold data array remove object at 0 to start as checked , loop platforms
    this.platforms = this.getData();
    console.log(this.platforms);
    while (this.getData().length) {
      this.platforms.removeAt(0)
    }

    for (let d of this.platformsArray) {
      this.addMore(d);
    }
    // Auto redirect off
  //   setTimeout((router) => {
  //     this.router.navigate(['/user']);
  // }, this.timer);  //30s

  }

  // get data from our Form as platforms
  getData() {
    return this.platformForm.get('platforms') as FormArray;
  }

  // loop and add platforms to array
  addMore(d) {
    this.getData().push(this.buildPlatforms(d));
  }

  // form creation function call buildPlaforms function to generate dynamic data structure
  createForm() {
    this.platformForm = this.fb.group({
      platforms: this.fb.array([this.buildPlatforms({
        platform_id: null,
        platform_name: null,
        platform_weight: null,
        selected: null
      })])
    });
  }

  // build data platforms function
  
  buildPlatforms(data) {
    // if data not arravied recived all null
    if (!data) {
      data = {
        platform_id: null,
        platform_name: null,
        platform_weight: null,
        selected: null
      }
    }
    // else get data
    return this.fb.group({
      platform_id: data.platform_id,
      platform_name: data.platform_name,
      platform_weight: data.platform_weight,
      selected: data.selected
    });
  }

  // submit function
  submit() {
    console.log(this.platformForm.value)
  }

 
}
