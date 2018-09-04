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
  //guest component constructor
  //input: router as Router import and route as ActivatedRoute import
  //output: send admin status "true" to server
  constructor(private router: Router , private route: ActivatedRoute) { }

  // router url decleration
  routeUrl: string;

  //guest on page init check token for admin/user
  //input: saved token
  //output: reroute
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
