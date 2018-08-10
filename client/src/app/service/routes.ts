import { SysinfoComponent } from './../admin/sysinfo/sysinfo.component';
import { WeightsComponent } from './../admin/weights/weights.component';
import { ReportsComponent } from './../admin/reports/reports.component';
import { AdminQuestionsComponent } from './../admin/questions/questions.component';
import { AdminsComponent } from './../admin/admins/admins.component';

import { UserQuestionsComponent } from './../user-profile/user-questions/user-questions.component';
import { Component } from '@angular/core';

import { Err404Component } from './../misc/err404/err404.component';
import { InputErrorComponent } from './../misc/input-error/input-error.component';
import { AboutUsComponent } from './../misc/about-us/about-us.component';
import { FinishComponent } from './../sign-up/finish/finish.component';
import { QuestionsComponent } from './../sign-up/questions/questions.component';
import { UserSettingsComponent } from './../sign-up/user-settings/user-settings.component';
import { RegistrationComponent } from './../sign-up/registration/registration.component';
import { SignUpComponent } from './../sign-up/sign-up.component';
import { UserComponent } from './../user/user.component';
import { LoginUserComponent } from './../login/login-user/login-user.component';
import { LoginComponent } from './../login/login.component';
import { GuestComponent } from './../guest/guest.component';
import { Routes } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserReportsComponent } from './../user-profile/user-reports/user-reports.component';
import { AdminComponent } from '../admin/admin.component';
import { UsersComponent } from '../admin/users/users.component';


// Routes file - Holds the routing system for our web app
//
//configuration objects
export const appRoutes: Routes = [

    // Home page guest routing
    {  
        path: '',
        component: GuestComponent,
        data: { title: 'Guest' }
    },

    //Login routing
    {
    path: 'login',
    component: LoginComponent,
    data: { title: 'login' }
    },

    //user routing
    {
    path: 'user',
    component: UserComponent,
    // canActivate: [AuthGuard],
    data: { title: 'user' }
    
    },

    //User Profile routing
    {
      path: 'user/profile',
      component: UserProfileComponent,
      data: { title: 'user/profile' }
    },
    //User Profile routing
    {
      path: 'user/reports',
      component: UserReportsComponent,
      data: { title: 'user/reports' }
    },
    //user questions comonent
    {
      path: 'user/questions',
      component: UserQuestionsComponent,
      data: {title: 'user/questions'}
    },

    //admin home page
    {
      path: 'admin',
      component: AdminComponent,
      data: {title: 'admin'},
      children: [
        {path: 'admins', component: AdminsComponent}, //admins list
        {path: 'users', component: UsersComponent},  // users list
          {path: 'questions', component: AdminQuestionsComponent},  //questions edit
          {path: 'reports', component: ReportsComponent},   //reports generator
        {path: 'weights', component: WeightsComponent},    //weights edit
        {path: 'sysinfo', component: SysinfoComponent},    //system info
      ]
    },

    //Login for our user routing removed from this version (read component instruction)
    // {
    //   path: 'loginUser',
    //   component: LoginUserComponent,
    //   data: { title: 'loginUser' }
    // },

     //Signup and user info routing
    {
      path: 'signup',
      component: SignUpComponent,
      data: { title: 'signup' },
      children: [ 
        {path: '', component: RegistrationComponent},
        {path: 'userSettings', component: UserSettingsComponent,
        // canActivate: [AuthGuard]
      }, 
        {path: 'userSettings/questions', component: QuestionsComponent,
        // canActivate: [AuthGuard]
      },
        {path: 'userSettings/questions/finish', component: FinishComponent,
        // canActivate: [AuthGuard]
      },
      ]
    },

    //About us routing
    {
      path: 'aboutUs',
      component: AboutUsComponent,
      data: { title: 'aboutUs' }
    },

    //Wrong Input error routing
    {
      path: 'Inputerror',
      component: InputErrorComponent,
      data: { title: 'Inputerror' }
    },


    //404 - error page not found rounting
    { 
      path: '**',
        component: Err404Component, 
        data: { title: '404'}
    }
  
  ];