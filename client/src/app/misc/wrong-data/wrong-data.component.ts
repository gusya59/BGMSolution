//registration managing
import { RegistrationComponent } from './../../sign-up/registration/registration.component';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-wrong-data',
  templateUrl: './wrong-data.component.html',
  styleUrls: ['./wrong-data.component.css']
})
export class WrongDataComponent implements OnInit {
  //define msg
  msg: string[];

  //construct component
  //input: registercomp imported as RegistrationComponent
  //output: 
  constructor(private registercomp: RegistrationComponent) { }

  //on page init fetch msg
  //input:
  //output: 
  ngOnInit() {
    this.msg = this.registercomp.errorMSG
  }

}
