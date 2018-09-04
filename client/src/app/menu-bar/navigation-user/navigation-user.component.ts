import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-user',
  templateUrl: './navigation-user.component.html',
  styleUrls: ['./navigation-user.component.css']
})
export class NavigationUserComponent implements OnInit {

  //nav bar user constructor
  //input: auth as AuthService import, router as Router import.
  //output: 
  constructor(private auth: AuthService,  private router: Router) { }

  //nav bar init
  //input: 
  //output: 
  ngOnInit() {
  }

  //logout button function
  //input: 
  //output: redirect to login 
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
