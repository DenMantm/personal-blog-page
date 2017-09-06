import { Component, HostListener, OnInit, Renderer, Inject, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../user/auth.service';
import { IUser } from '../user/user.model';
import { JQUERY_TOKEN,SaveObjectService } from '../common/index';
import { ActivatedRoute, Router } from '@angular/router';

declare var PR;
@Component({
    templateUrl:'app/blog-posts/blog-posts.component.html',
    styleUrls:['app/blog-posts/blog-posts.component.css']
})


export class BlogPostsComponent implements OnInit {
    currentUser:any;
    user:IUser;
    blogPostList:any;
    createBlPost:FormGroup;
    blogPostName:FormControl;
    blogPostDescription:FormControl;

constructor(private auth:AuthService,
			@Inject(JQUERY_TOKEN) private $,
			private route:ActivatedRoute,
			private objectService:SaveObjectService,
			private router:Router,
			){}

//form
    ngOnInit(){
       this.currentUser = this.route.snapshot.data['User'];
       this.blogPostList = this.route.snapshot.data['BlogPostList'];
       
       this.blogPostName = new FormControl('',Validators.required)
        this.blogPostDescription = new FormControl('',Validators.required)
        this.createBlPost = new FormGroup({
            blogPostName:this.blogPostName,
            blogPostDescription:this.blogPostDescription
        })
       
       
       
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
    createBlogPost(fValues){
        
        let tmpPost = {title:fValues.blogPostName,
                       description:fValues.blogPostDescription,
                       //Leaving this to support template functionality after
                       blogElements:[{
                        "id": 0,
                        "type": 'div',
                        "style": null,
                        "text": "Type in the content here..."
                    }]};
        
        this.objectService.newBlogPost(tmpPost).subscribe( (res:any) => {
            //console.log(res)
                let newEntity = JSON.parse(res._body);
                this.router.navigate(['/blog-posts',newEntity._id]);
        });
    }
           //universal validator
    validInputField(fieldRef){
        return (!fieldRef.hasError('required') || fieldRef.pristine);
    }
   
   


}

	
