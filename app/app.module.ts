import './rxjs-extemtions';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule,ActivatedRouteSnapshot} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';



import { MyAppComponent} from './my-app.component';
import { NavbarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';
import { HomeComponent } from './home/index';
import { ProjectsPageComponent } from './projects/index';
import { BlogPostsComponent, BlogPostListResolverService, BlogPostInstanceComponent, BlogPostInstanceResolverService } from './blog-posts/index';
import { FooterComponent } from './footer/footer.component';
import { LoginSignupComponent } from './footer/loginSignup/login-signup.component';
import { ContentEditNav } from './content-edit-nav/content-edit-nav.component';
import {    SnippetRepository, 
            SnippetInstance,
            SnippetRepResolverService,
            SnippetRepSidebar,
            SnippetListResolverService,
        } from './snippet-rep/index';


//service
import { AuthService, UserLoggedInResolver } from './user/index';

import { JQUERY_TOKEN,
         FirstPageGuard,
         LoggedInGuard,
         SaveObjectService,
         ArrayUtilityService,
         ContenteditableModelText,
         ContenteditableModelHtml,
         NativeWindowRef,
         ScrollToElementService,
         MediumEditorService,
         VariableStorageService,
         ToastrNotifyService
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
                    ProjectsPageComponent,
                    SnippetRepository,
                    SnippetInstance,
                    MyAppComponent,
                    ContenteditableModelText, //directive
                    ContenteditableModelHtml, //directive
                    SnippetRepSidebar,
                    FooterComponent,
                    LoginSignupComponent,
                    ContentEditNav,
                    BlogPostsComponent,
                    BlogPostInstanceComponent
                    ],
    providers: [AuthService,
                FirstPageGuard,
                LoggedInGuard,
                SaveObjectService,
                SnippetRepResolverService,
                BlogPostListResolverService,
                BlogPostInstanceResolverService,
                UserLoggedInResolver,
                ArrayUtilityService,
                NativeWindowRef,
                ScrollToElementService,
                MediumEditorService,
                VariableStorageService,
                ToastrNotifyService,
                SnippetListResolverService,
                {provide:JQUERY_TOKEN,useValue:jQuery}
    ],
    bootstrap:[MyAppComponent]
})

export class AppModule {
    
}