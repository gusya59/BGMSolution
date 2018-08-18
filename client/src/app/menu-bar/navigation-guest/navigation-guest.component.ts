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

  constructor(private auth: AuthService,  private router: Router) {
    
   }

  ngOnInit() {
    // if there is a token, get it
    if(localStorage.getItem('token')){   
       this.tokenRecived = localStorage.getItem('token');
      }

  }
  //logout button
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
