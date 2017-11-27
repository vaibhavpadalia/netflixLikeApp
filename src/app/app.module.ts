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
import { SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
import { AuthServiceConfig } from 'angular4-social-login';
import { AdminGuard } from './admin.guard';
import { SearchPipe } from './search.pipe';
import { AnonymousGuard } from './anonymous.guard';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('Not to be shared')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Not to be shared')
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
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    SocialLoginModule
  ],
  providers: [UserService, AuthGuard, AdminGuard, AnonymousGuard, [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
