import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-guest',
  templateUrl: './navigation-guest.component.html',
  styleUrls: ['./navigation-guest.component.css']
})

export class NavigationGuestComponent implements OnInit {
  //define token holder
  tokenRecived = "";

  //nav bar guest constructor
  //input: auth as AuthService import, router as Router import.
  //output: 
  constructor(private auth: AuthService,  private router: Router) {
    
   }

  //nav bar init
  //input: token
  //output: 
  ngOnInit() {
    this.tokenRecived = localStorage.getItem('token');
  }

  //logout button function
  //input: 
  //output: redirect to login 
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
