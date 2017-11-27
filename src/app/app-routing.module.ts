import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { MovieComponent } from './movie/movie.component';
import { SeriesComponent } from './series/series.component';
import { SeasonComponent } from './season/season.component';
import { EpisodeComponent } from './episode/episode.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AnonymousGuard } from './anonymous.guard';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard]},
    { path: '', component: WelcomeComponent },
    { path: 'movies', component: MovieComponent, canActivate: [AuthGuard] },
    { path: 'series', component: SeriesComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [AnonymousGuard] },
    { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
    { path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'season/:value', component: SeasonComponent, canActivate: [AuthGuard]},
    { path: 'episode/:name/:number', component: EpisodeComponent, canActivate: [AuthGuard]},
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: '**', component: WelcomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents =
    [WelcomeComponent, LoginComponent, EpisodeComponent, AdminComponent, SignupComponent, SeasonComponent,
        DashboardComponent, MovieComponent, SeriesComponent, ProfileComponent, ChangePasswordComponent];
