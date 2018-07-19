import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CoinService {

  constructor(private http: HttpClient) { }

  addCoin(firstName, lastName, email, password) {
    const uri = 'http://localhost:4200/signup/';
    const obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password

    };
    this.http.post(uri, obj)
        .subscribe(res => console.log('Done'));
  }
}