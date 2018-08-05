import { Component, OnInit } from '@angular/core';
//registration managing
import { RegistrationComponent } from './../../sign-up/registration/registration.component';
@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.css']
})
export class InputErrorComponent implements OnInit {


//define vars
msg: string[];
constructor(private registercomp: RegistrationComponent) { }

ngOnInit() {
  this.msg = this.registercomp.errorMSG;
  console.log(this.registercomp.errorMSG);
}

}
