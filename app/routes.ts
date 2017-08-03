

import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';

//one import combined in barel
import { SnippetRepository,SnippetRepResolverService } from './snippet-rep/index';
import { LandingPageComponent } from './landing-page/index';
import { HomeComponent } from './home/index';

import {FirstPageGuard,LoggedInGuard } from './common/index';

//canDeactivate:['canDeactivateCreateEvent'],

export const appRoutes:Routes = [
    {path:'landingPage',component:LandingPageComponent},
    {path:'snippet-repository',component:SnippetRepository,resolve:{SNIPPETS:SnippetRepResolverService}},
    //{path:'home',component:HomeComponent,canActivate:[LoggedInGuard]},
    { path: '404', component: Error404Component },
    {path:'', redirectTo:'/landingPage', pathMatch:'full'}
    ];