import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

    //general values
    numUsers: number = 0;
    numAdmins: number =0;
    serverTime: Date;

  //table data inserted
  searchText: string;
  tableData = [
    { id: '1', firstName: 'Mark', lastName: 'Otto', username: '@mdo' },
    { id: '2', firstName: 'Jacob', lastName: 'Thornton', username: '@jcox' },
    { id: '3', firstName: 'Larry', lastName: 'Last', username: '@larry' },
    { id: '4', firstName: 'John', lastName: 'Doe', username: '@johny' },
    { id: '5', firstName: 'Zigi', lastName: 'Kiwi', username: '@zk' },
    { id: '6', firstName: 'Beatrice', lastName: 'Selphie', username: '@bsl' },
  ];
  constructor() { 
    //get system time acording to zolo
    setInterval(() => {
      this.serverTime = new Date();
    }, 1);
  }

  ngOnInit() {
    // on page build load server Data
    this.numUsers = 1500;
    this.numAdmins = 3;
  }

  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].includes(searchKey);
      });
    });
  }

  search() {
    if (!this.searchText) {
      return this.tableData;
    }
    if (this.searchText) {
      return this.filterIt(this.tableData, this.searchText);
    }
  }

}
