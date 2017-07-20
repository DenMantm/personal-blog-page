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

constructor(private auth:AuthService,
@Inject(JQUERY_TOKEN) private $){
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

login(value){
    this.auth.login(value.username,value.password).subscribe(resp => {
                    if(resp.json().status == 'failed'){
                        this.validLogin = false;
                    }

    })

}

}

	
