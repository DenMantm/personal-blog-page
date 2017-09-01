import { Component, HostListener, OnInit, Renderer, Inject, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../user/auth.service';
import { IUser } from '../user/user.model';
import { JQUERY_TOKEN,SaveObjectService } from '../common/index';
import { ActivatedRoute } from '@angular/router';

declare var PR;
@Component({
    templateUrl:'app/blog-posts/blog-posts.component.html',
    styleUrls:['app/blog-posts/blog-posts.component.css']
})


export class BlogPostsComponent implements OnInit {
currentUser:any;
user:IUser;
blogPostList:any;

constructor(private auth:AuthService,
			@Inject(JQUERY_TOKEN) private $,
			private route:ActivatedRoute,
			private objectService:SaveObjectService
			){}

//form
    ngOnInit(){
       this.currentUser = this.route.snapshot.data['User'];
       this.blogPostList = this.route.snapshot.data['BlogPostList'];
    }
    ngAfterViewInit(){
    	   PR.prettyPrint();
    }

   loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
   
    editClick(){
    }
    disableClick(){
    }
    saveClick(){
			// Save object here
        PR.prettyPrint();
    }
    testPost(){
        
        let tmpPost = {title:"New Blog Post",blogElements:[{
                        "id": 0,
                        "type": 'div',
                        "style": null,
                        "text": "New blog element"
                    }]};
        
        this.objectService.newBlogPost(tmpPost).subscribe( res => {console.log(res)});
    }
   
   


}

	
