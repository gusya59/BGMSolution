import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.css']
})
export class NavigationAdminComponent implements OnInit {

  constructor(private auth: AuthService,  private router: Router) { }

  ngOnInit() {

  }
    //logout button
    logout(){
      this.auth.logout();
      this.router.navigate(['/login']);
    }

}


