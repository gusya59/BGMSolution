import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

    //define time variable
    timer: number = 30000;

  constructor(private router: Router ) { }

  ngOnInit() {
    setTimeout((router) => {
      this.router.navigate(['/user']);
  }, this.timer);  //30s
  }

}
