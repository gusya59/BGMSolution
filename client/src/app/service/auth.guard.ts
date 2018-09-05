import { AuthService } from './auth.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  //constructor function
  //input: Router imported as router, AuthService imported as auth.

  constructor(private router: Router, public auth: AuthService){

  }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (localStorage.getItem('token')) {
//         // logged in so return true
//         return true;
//     }

//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//     return false;
// }

  //function that decided if the user can active the route
  //input:
  //output: true if yes and false if no. 
  canActivate(): boolean {
    //if token exsist and not expired
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
      }
    else {
      return true; //if not token or expired remove it
      }
  }

}
