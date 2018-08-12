import { Injectable } from '@angular/core';
// Import of http service
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from '../../../node_modules/rxjs/operators';

//interface for returning router resp
interface respData {
  success: boolean,
  message: string,
  status: number,
  errors: string[],
  token: string,
  Headers: any
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//debug Logged in manual seassion overide
// false for logged out true for logged in.
  private loggedInStatus = false;


  constructor(private http: HttpClient) { }

  //get logged in replace property name with action
  get isLoggedIn(){
    return this.loggedInStatus;
  }

  //setting the logged in status after succsessful log or registration run
  setLoggedIn(status: boolean){
    this.loggedInStatus = status;
  }

  //get user info from backend HTTP
  UserLogin(InputEmail: string, InputPassword: string){
    //will get user info if correct
    const uri = 'http://localhost:1234/signup/login';
    // our object holding the login data
    const obj = {
      email: InputEmail,
      password: InputPassword
    };

    return this.http.post<any>(uri,obj)
    .pipe(map(Data => {
        // login successful if there's a jwt token in the response
        if (Data && Data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(Data));
            console.log(Data)
        }
        return Data;
    }));
    
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  } 

  addUser(inputfirstname, inputlastname, inputEmail, inputPassword, confirmPassword,checkBox) {
    const uri = 'http://localhost:1234/signup/registration';
    const obj = {
    
    firstName: inputfirstname,
    lastName: inputlastname,
    email: inputEmail, 
    password: inputPassword,
    passwordConfirmation: confirmPassword,
    checkBox: checkBox
    };
    //post registration to server
    
    //header manage
    // var reqHeader = new HttpHeaders({'content-Type': 'application/x-www-urlencoded'});
    // return this.http.post<respData>(uri, obj, {headers: reqHeader})

    return this.http.post<respData>(uri, obj)
  }

  //delete user function

  deleteUser(password){
    const uri = 'http://www.mocky.io/v2/5b61f0f4300000e9366a4433';
    return this.http.post<respData>(uri,password);
  }

}
