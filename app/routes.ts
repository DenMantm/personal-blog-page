

import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';

//one import combined in barel
import { SnippetRepository } from './snippet-repository/snippet-repository.component';
import { LandingPageComponent } from './landing-page/index';
import { HomeComponent } from './home/index';

import {FirstPageGuard,LoggedInGuard } from './common/index';

//canDeactivate:['canDeactivateCreateEvent'],

export const appRoutes:Routes = [
    {path:'landingPage',component:LandingPageComponent},
    {path:'snippet-repository',component:SnippetRepository},
    //{path:'home',component:HomeComponent,canActivate:[LoggedInGuard]},
    { path: '404', component: Error404Component },
    {path:'', redirectTo:'/landingPage', pathMatch:'full'}
    ];