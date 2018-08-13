import  decode  from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceService {

  constructor(public auth: AuthService, private router: Router) { }

  //admin can activeate
  canActivate(): boolean{

    //get token
    const token = localStorage.getItem('token');
    // console.log(token)
    // decode token
    const tokenPayLoad = decode(token);

    //if not authenticated or not carring isAdmin payload
    if(!this.auth.isAuthenticated() || !tokenPayLoad.isAdmin){
      //if not admin
      this.router.navigate(['login']);
      return false;
      //if admin
    }else return true;
  }

}
