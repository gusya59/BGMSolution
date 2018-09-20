import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  //deffine connection string
  //localhost:1234
  httpurl = 'http://54.245.139.255:3000';
}
