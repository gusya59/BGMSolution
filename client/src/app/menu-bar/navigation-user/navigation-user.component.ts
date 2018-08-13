import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-user',
  templateUrl: './navigation-user.component.html',
  styleUrls: ['./navigation-user.component.css']
})
export class NavigationUserComponent implements OnInit {

  constructor(private auth: AuthService,  private router: Router) { }

  ngOnInit() {
  }
//log out button function
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
