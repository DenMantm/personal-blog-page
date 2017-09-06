import { Component, HostListener, OnInit, Renderer, Inject, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../user/auth.service';
import { IUser } from '../../user/user.model';
import { JQUERY_TOKEN,
         SaveObjectService,
         ArrayUtilityService,
         MediumEditorService,
} from '../../common/index';
import { ActivatedRoute } from '@angular/router';

declare var PR;
declare var swal;
@Component({
    templateUrl:'app/blog-posts/blog-post-instance/blog-post-instance.component.html',
    styleUrls:['app/blog-posts/blog-post-instance/blog-post-instance.component.css']
})


export class BlogPostInstanceComponent implements OnInit {
    currentUser:any;
    user:IUser;
    blogPost:any;
    lastStateBlogPost:any;
    showElementTools:boolean
    editor:any

constructor(private auth:AuthService,
			@Inject(JQUERY_TOKEN) private $,
			private route:ActivatedRoute,
			private objectService:SaveObjectService,
			private arrayUtil:ArrayUtilityService,
            private medium:MediumEditorService
			){}

//form
    ngOnInit(){
       this.currentUser = this.route.snapshot.data['User'];
       this.route.data.subscribe((res:any)=>{ 
           this.blogPost =  JSON.parse(res['BlogPost']._body);
           this.lastStateBlogPost = JSON.parse(res['BlogPost']._body);
       })

       
    //     this.route.params.subscribe(params => {

    //                 let blogId = params['blogId'];
    //                 this.objectService.loadBlogPost(blogId).subscribe( (res:any) => {
                       
    //                   this.blogPost = JSON.parse(res._body);
    //                     console.log(this.blogPost);
                        
                        
    //                 });

    // });
       
       
       
       
    }
    ngAfterViewInit(){
    	   PR.prettyPrint();
    }

   loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
   
 remove(item,itemList){
        this.arrayUtil.removeItem(item,itemList);
   }
   moveDown(item,itemList){
       
      this.arrayUtil.moveItemDown(item,itemList); 
   }
   moveUp(item,itemList){
       
       this.arrayUtil.moveItemUp(item,itemList); 
   }
   addElementDiv(list){
        this.arrayUtil.addNewElementDiv(list);
        setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   addElementPre(list){
        this.arrayUtil.addNewElementPre(list);
        setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   
   editClick(){
       //Extra variable here
       this.showElementTools = true;
        this.editor = this.medium.createInstance();
    //           this.$('.editable').mediumInsert({
    //     editor: this.editor
    // });
        }
        disableClick(){
            this.showElementTools = false;
            this.editor.destroy();
            
        }
        saveClick(){
            console.log(this.blogPost);
            this.objectService.editBlogPost(this.blogPost).subscribe(res => {
            
            //console.log(res)
            this.lastStateBlogPost =  this.arrayUtil.deepCopy(this.blogPost);
                
            }
            );
            //Save to be created here
            
            
            PR.prettyPrint();
        }
        
            canDeactivate():any {
                if (JSON.stringify(this.blogPost) !== JSON.stringify(this.lastStateBlogPost) ) {
                    
                //     let userResponse = window.confirm('Discard changes?');
                //         if(userResponse) this.showElementTools = false;
                    
                //   return userResponse
                    let obs;
        
        let promise = new Promise<any>( subsc => obs = subsc );
        
        // let userResponse = false;
        
        swal({
          title: "Are you sure?",
          text: "Discard changes?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
          if (isConfirm) {
            obs(true);

          } else {
            obs(false);
          }
        });
        //console.log(userResponse);
        
        
        return promise.then(res => 
        { console.log('DEBUG: '+ res )
        return res
            
        }
        )
                }
                else{
                 this.showElementTools = false;
                 return true;
                }

}

}

	
