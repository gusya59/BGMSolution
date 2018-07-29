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

    //Login for our user routing
    {
      path: 'loginUser',
      component: LoginUserComponent,
      data: { title: 'loginUser' }
    },

    //user routing
    {
      path: 'user',
      component: UserComponent,
      // canActivate: [AuthGuard],
      data: { title: 'user' }
      
    },

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
    // { 
    //   path: '**',
    //     component: Err404Component, 
    //     data: { title: '404'}
    // }
  
  ];