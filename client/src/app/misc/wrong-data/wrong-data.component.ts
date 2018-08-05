//registration managing
import { RegistrationComponent } from './../../sign-up/registration/registration.component';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-wrong-data',
  templateUrl: './wrong-data.component.html',
  styleUrls: ['./wrong-data.component.css']
})
export class WrongDataComponent implements OnInit {
  //define vars
  msg: string[];
  constructor(private registercomp: RegistrationComponent) { }

  ngOnInit() {
    this.msg = this.registercomp.errorMSG
  }

}
