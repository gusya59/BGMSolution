
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { QuestionsComponent } from './sign-up/questions/questions.component';
import { Err404Component } from './misc/err404/err404.component';
//import router module
import {appRoutes} from './service/routes';
//import Reports and userProfile
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserReportsComponent } from './user-profile/user-reports/user-reports.component';
import { UserQuestionsComponent } from './user-profile/user-questions/user-questions.component';
import { AdminComponent } from './admin/admin.component';
import { AdminsComponent } from './admin/admins/admins.component';
import { UsersComponent } from './admin/users/users.component';
import { WeightsComponent } from './admin/weights/weights.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { SysinfoComponent } from './admin/sysinfo/sysinfo.component';
import {AdminQuestionsComponent} from './admin/questions/questions.component'



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
    BarComponent,
    QuestionsComponent,
    Err404Component,
    UserProfileComponent,
    UserReportsComponent,
    UserQuestionsComponent,
    AdminComponent,
    AdminsComponent,
    UsersComponent,
    WeightsComponent,
    ReportsComponent,
    SysinfoComponent,
    AdminQuestionsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [countryService,RegistrationComponent,AuthService,AuthGuard],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
