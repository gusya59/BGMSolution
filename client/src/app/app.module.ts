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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [countryService],
  bootstrap: [AppComponent]
})
export class AppModule { }