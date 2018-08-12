import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  returnUrl: string;
  constructor(private router: Router , private route: ActivatedRoute) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
    //if logged in redirect to user page
    if(localStorage.getItem('token')){
      this.router.navigate([this.returnUrl]);
    }
  }

}
