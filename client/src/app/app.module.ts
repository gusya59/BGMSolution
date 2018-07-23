import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
// Nav bars
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { NavigationGuestComponent } from './menu-bar/navigation-guest/navigation-guest.component';
import { NavigationAdminComponent } from './menu-bar/navigation-admin/navigation-admin.component';
import { NavigationUserComponent } from './menu-bar/navigation-user/navigation-user.component';
//  gallery
import { ApiGalleryComponent } from './api-gallery/api-gallery.component';
// login components
import { LoginComponent } from './login/login.component';
import { LoginUserComponent } from './login/login-user/login-user.component';
// signup components
import { RegistrationComponent } from './sign-up/registration/registration.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserSettingsComponent } from './sign-up/user-settings/user-settings.component';
import {countryService} from './countryService';
import { FooterComponent } from './misc/footer/footer.component';
import { RecoveryComponent } from './login/recovery/recovery.component';
import { WrongEPComponent } from './misc/wrong-e-p/wrong-e-p.component';
import { WrongDataComponent } from './misc/wrong-data/wrong-data.component';
import { InputErrorComponent } from './misc/input-error/input-error.component';
import { FinishComponent } from './sign-up/finish/finish.component';
import { GuestComponent } from './guest/guest.component';
//router
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
//MDB bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AboutUsComponent } from './misc/about-us/about-us.component';
import { VideoComponent } from './misc/video/video.component';
import { UserComponent } from './user/user.component';
import { PreviewComponent } from './user/preview/preview.component';
import { OurServiceComponent } from './misc/our-service/our-service.component';
import { BarComponent } from './sign-up/bar/bar.component';

//for the server side connection
import { ReactiveFormsModule } from '@angular/forms';
//auth service + guard
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard';


//configuration objects
const appRoutes: Routes = [
  {  
    path: '',
    component: GuestComponent,
    data: { title: 'Guest' }
  },
  {
  path: 'login',
  component: LoginComponent,
  data: { title: 'login' }
  },
  {
    path: 'loginUser',
    component: LoginUserComponent,
    data: { title: 'loginUser' }
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { title: 'user' }
    
  },
  {
    path: 'signup',
    component: SignUpComponent,
    data: { title: 'signup' },
    children: [ 
      {path: '', component: RegistrationComponent},
      {path: 'userSettings', component: UserSettingsComponent,
      // canActivate: [AuthGuard]
    }, 
      {path: 'userSettings/finish', component: FinishComponent,
      canActivate: [AuthGuard]},
    ]
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
    data: { title: 'aboutUs' }
  },
  { path: '',
    redirectTo: '/Guest',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    NavigationGuestComponent,
    NavigationAdminComponent,
    NavigationUserComponent,
    ApiGalleryComponent,
    LoginComponent,
    LoginUserComponent,
    RegistrationComponent,
    SignUpComponent,
    UserSettingsComponent,
    FooterComponent,
    RecoveryComponent,
    WrongEPComponent,
    WrongDataComponent,
    InputErrorComponent,
    FinishComponent,
    GuestComponent,
    AboutUsComponent,
    VideoComponent,
    UserComponent,
    PreviewComponent,
    OurServiceComponent,
    BarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [countryService,RegistrationComponent,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
