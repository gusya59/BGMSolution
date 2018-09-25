import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  //deffine connection string
  //localhost:1234
 // httpurl = 'https://bgmbackservice.azurewebsites.net';
  httpurl = 'http://localhost:3000';
}
