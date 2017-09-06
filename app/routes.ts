import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';

//one import combined in barel
import { SnippetRepository,SnippetRepResolverService, SnippetListResolverService } from './snippet-rep/index';
import { ProjectsPageComponent } from './projects/index';
import { BlogPostsComponent,BlogPostListResolverService, BlogPostInstanceComponent, BlogPostInstanceResolverService } from './blog-posts/index';
import { HomeComponent } from './home/index';

import {FirstPageGuard,LoggedInGuard, CanDeactivateGuard } from './common/index';

import { UserLoggedInResolver } from './user/index'

//canDeactivate:['canDeactivateCreateEvent'],

export const appRoutes:Routes = [
    {path:'projects',component:ProjectsPageComponent,resolve:{User:UserLoggedInResolver}},
    {path:'blog-posts',component:BlogPostsComponent,resolve:{User:UserLoggedInResolver,BlogPostList:BlogPostListResolverService}},
    {path:'blog-posts/:blogId',
     component:BlogPostInstanceComponent,
     canDeactivate: [CanDeactivateGuard],
     resolve:{BlogPost:BlogPostInstanceResolverService,User:UserLoggedInResolver},
     data: { blogId: ':blogId' }
    },
    {path:'snippet-repository',
        component:SnippetRepository,
        resolve:{SNIPPETS:SnippetListResolverService,
                 currentSgroup:SnippetRepResolverService,
                 User:UserLoggedInResolver
    }},
    {path:'snippet-repository/:sGroup',
        component:SnippetRepository,
        canDeactivate: [CanDeactivateGuard],
        resolve:{SNIPPETS:SnippetListResolverService,
                 currentSgroup:SnippetRepResolverService,
                 User:UserLoggedInResolver
    }},
    //{path:'home',component:HomeComponent,canActivate:[LoggedInGuard]},
    { path: '404', component: Error404Component },
    {path:'', redirectTo:'/projects', pathMatch:'full'}
    ];