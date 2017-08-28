import { Component, HostListener, OnInit, Renderer, Inject, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../user/auth.service';
import { IUser } from '../user/user.model';
import { JQUERY_TOKEN } from '../common/index';
import { ActivatedRoute } from '@angular/router';

declare var PR;
@Component({
    templateUrl:'app/blog-posts/blog-posts.component.html',
    styleUrls:['app/blog-posts/blog-posts.component.css']
})


export class BlogPostsComponent implements OnInit {
currentUser:any;
user:IUser;

constructor(private auth:AuthService,
			@Inject(JQUERY_TOKEN) private $,
			private route:ActivatedRoute){
            }

//form
ngOnInit(){
   this.currentUser = this.route.snapshot.data['User'];
}
ngAfterViewInit(){
	   PR.prettyPrint();
}

   loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
   
      editClick(){
          
        this.$('.editable').hallo({
          plugins: {
            'halloindicator': {},
            'halloformat': {},
            'halloheadings': {},
            'hallojustify': {},
            'hallolists': {},
            'hallolink': {},
            'halloreundo': {},
            // 'halloimage': {
            //     search: function(query, limit, offset, successCallback) {
            //         response = {offset: offset, total: limit + 1, assets: searchresult.slice(offset, offset+limit)};
            //         successCallback(response);
            //     },
            //     suggestions: null,
            //     uploadUrl: function() {
            //       return '/some/example/url'
            //     }
            // }
          },
          editable: true,
          toolbar: 'halloToolbarFixed'
        })
        .hallo('protectFocusFrom', this.$('#enable'));

        // this.$('.editable').bind('hallomodified', function(event, data) {
        //     this.$('#modified').html("Editables modified");
        // });
        // this.$('.editable').bind('halloselected', function(event, data) {
        //     this.$('#modified').html("Selection made");
        // });
        // this.$('.editable').bind('hallounselected', function(event, data) {
        //     this.$('#modified').html("Selection removed");
        // });
        }
        disableClick(){
            this.$('.editable').hallo({editable: false});
        }
        saveClick(){
			// Save object here
            PR.prettyPrint();
        }
   
   


}

	
