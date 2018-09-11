import { ModalDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from './../../service/admin-service.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

// users object declaration
users: {
  created: string;
  firstName: string;  
  lastName: string;
  email: string;
}[];

// question declaration
surveyData: {
  question_id: string,
  question_text: string,
  answers: {
    answer_id: string;
    answer_text: string
  }[];
}[];



//allow to see usersModal for usersModal modal use
@ViewChild('usersModal') usersModal: ModalDirective;

//allow to see adminsModal for adminsModal modal use
@ViewChild('adminsModal') adminsModal: ModalDirective;

  constructor(private adminservice: AdminServiceService) {

   }

  ngOnInit() {
    //call admin service to get questions table
  this.adminservice.fetchSurveyData().subscribe(
    Data=>{
      // console.log(Data);
        this.surveyData = Data.surveyData;
    })

  }

  //opens the modal acording to user type
  //input: isAdmin: true => admins else users
  openUsersModal(isAdmin){
    this.fetchUsersTable(isAdmin);
    if(!isAdmin){
      this.usersModal.show();
    }
    else this.adminsModal.show();
  }

  //get users/admins table from server
  //input: isAdmin: true => admins else users
  //outpit: build users/admins table
  fetchUsersTable(isAdmin){
    //call admin service to get user table
    this.adminservice.fetchUsersTable(isAdmin).subscribe(
      Data=>{
          this.users = Data.adminUsers;
            //  console.log(Data)
      })
  }

  //set asnswers obj into array
  //input: answer object
  //output: map to array 
  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key])
  }


  //print page 2 PDF https://rawgit.com/MrRio/jsPDF/master/docs/index.html <= more info imported and tested alpha
  //input: toExport <= name of our html element to print
  //output: pdf file with name of BGM + toExport + .pdf
  exportToPdf(toExport){
       console.log(toExport)
    // print to PDF file
      var data = document.getElementById(toExport);  
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 180;   
        var pageHeight = 400;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
    
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 2;  
        pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight)  
        pdf.save('BGM_Report_'+toExport+'.pdf'); // Generated PDF   
      });
    }
    
}


