import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.css']
})
export class NavigationAdminComponent implements OnInit {

  //nav bar admin constructor
  //input: auth as AuthService import, router as Router import.
  //output: 
  constructor(private auth: AuthService,  private router: Router) { }

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


