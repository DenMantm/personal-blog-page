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
code:string;

constructor(private auth:AuthService,
			@Inject(JQUERY_TOKEN) private $,
			private route:ActivatedRoute){
				
     this.code = `import {Component, ViewChild, ElementRef, AfterViewInit,OnInit, Inject} from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ActivatedRoute } from '@angular/router';
import { JQUERY_TOKEN } from '../common/index';


@Component({
    templateUrl:'./app/home/home.component.html',
		styles:[\`h1 {color:red;}\`]
})


export class HomeComponent implements OnInit {
		ngOnInit(): void {
			this.user = this.route.snapshot.data['user'];
		}
	user:any;
	constructor(
	private route:ActivatedRoute,	
	private auth:AuthService,
	@Inject(JQUERY_TOKEN) private $){
	}
  ngAfterViewInit() {
    
  }
	ngOnChanges(){
		this.user = this.auth.getCurrentUser();
	}


}`;
}

//form
ngOnInit(){
   this.currentUser = this.route.snapshot.data['User'];
}
ngAfterViewInit(){
	   PR.prettyPrint();
}

   loginCheck(){
       console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }


}

	
