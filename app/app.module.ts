import './rxjs-extemtions';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import { MyAppComponent} from './my-app.component';
import { NavbarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';

import { HomeComponent } from './home/index';
import { LandingPageComponent } from './landing-page/index';
import { SnippetRepository, SnippetInstance,ContenteditableModel,SnippetRepResolverService,SnippetRepSidebar,SnippetEditNav } from './snippet-rep/index';
import { FooterComponent } from './footer/footer.component';
import { LoginSignupComponent } from './footer/loginSignup/login-signup.component';



//service
import { AuthService } from './user/auth.service';

import { JQUERY_TOKEN,
 FirstPageGuard,
 LoggedInGuard,
 SaveObjectService
         } from './common/index';

import { appRoutes } from './routes'

declare let jQuery:Object;
declare let moment:Object;

// declare let metro:Object;

@NgModule({
    imports:[BrowserModule,
            RouterModule.forRoot(appRoutes),           
            FormsModule,
            ReactiveFormsModule,
            HttpModule],
    declarations:[
                    NavbarComponent,
                    Error404Component,
                    HomeComponent,
                    LandingPageComponent,
                    SnippetRepository,
                    SnippetInstance,
                    MyAppComponent,
                    ContenteditableModel, //directive
                    SnippetRepSidebar,
                    FooterComponent,
                    LoginSignupComponent,
                    SnippetEditNav
                    ],
    providers: [AuthService,FirstPageGuard,LoggedInGuard,SaveObjectService,SnippetRepResolverService,
        {provide:JQUERY_TOKEN,useValue:jQuery}


    ],
    bootstrap:[MyAppComponent]
})

export class AppModule {
    
}