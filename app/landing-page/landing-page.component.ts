import { Component, HostListener, OnInit, ElementRef, Renderer, Inject, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../user/auth.service';
import { IUser } from '../user/user.model';
import { JQUERY_TOKEN } from '../common/index';


@Component({
    templateUrl:'app/landing-page/landing-page.component.html',
    styleUrls:['app/landing-page/landing-page.component.css']
})


export class LandingPageComponent implements OnInit {

loginForm:FormGroup;
username:FormControl;
password:FormControl;
user:IUser;
el: ElementRef;
validLogin:boolean;
code:string;

constructor(private auth:AuthService,
@Inject(JQUERY_TOKEN) private $){
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
    this.validLogin = true;
    this.username = new FormControl('',Validators.required)
    this.password = new FormControl('',Validators.required)
    this.loginForm = new FormGroup({
        username:this.username,
        password:this.password
    })
}



}

	
