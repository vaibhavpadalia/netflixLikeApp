import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routingComponents, AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
import { AuthServiceConfig } from 'angular4-social-login';
import { AdminGuard } from './admin.guard';



const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('999152044436-ru46es165cg49nj3b5q1c35km6mu101o.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('190259691532770')
  }
]);
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    SocialLoginModule
  ],
  providers: [UserService, AuthGuard, AdminGuard, [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
