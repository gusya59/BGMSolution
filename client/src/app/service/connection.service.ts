import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  //deffine connection string
  httpurl = 'http://localhost:1234';
}
