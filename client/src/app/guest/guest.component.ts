import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  returnUrl: string;
  constructor(private router: Router , private route: ActivatedRoute) { }

  routeUrl: string;

  ngOnInit() {
    //get token
    const token = localStorage.getItem('token');
    // console.log(token)
    // decode token
    const tokenPayLoad = decode(token);
    if(tokenPayLoad.isAdmin){
      this.routeUrl = "/admin";
    }
    else this.routeUrl = "/user";
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.routeUrl;
    //if logged in redirect to user page
    if(localStorage.getItem('token')){
      this.router.navigate([this.returnUrl]);
    }
  }

}
