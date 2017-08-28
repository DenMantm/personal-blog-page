import { Component, HostListener, OnInit, Renderer, Inject, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../user/auth.service';
import { IUser } from '../user/user.model';
import { JQUERY_TOKEN } from '../common/index';
import { ActivatedRoute } from '@angular/router';

declare var PR;
@Component({
    templateUrl:'app/projects/projects-page.component.html',
    styleUrls:['app/projects/projects-page.component.css']
})


export class ProjectsPageComponent implements OnInit {
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
        }
        disableClick(){
            
        }
        saveClick(){
			// Save object here
            PR.prettyPrint();
        }
   
   


}

	
