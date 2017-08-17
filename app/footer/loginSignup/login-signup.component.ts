import { Component, Inject } from '@angular/core';
import { JQUERY_TOKEN } from '../../common/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../user/auth.service';
import { IUser } from '../../user/user.model';
import { Router } from '@angular/router';


@Component({
    selector: 'login-signup-component',
    templateUrl: 'app/footer/loginSignup/login-signup.component.html',
    styleUrls: ['app/footer/loginSignup/login-signup.component.css']
})

export class LoginSignupComponent {
    loginForm:FormGroup;
    logUsername:FormControl;
    logPassword:FormControl;
    signupForm:FormGroup;
    sigUsername:FormControl;
    sigEmail:FormControl;
    sigPassword:FormControl;
    sigPasswordRep:FormControl;
    sigPasswordAdmin:FormControl;
    
    //variable for the state of the form
    isChangeFormState:boolean;
    
    constructor(@Inject(JQUERY_TOKEN) private $,
                private auth:AuthService,
                private router:Router){
    }
    ngOnInit(){
        this.isChangeFormState = true;
        //Login Form
        this.logUsername = new FormControl('',Validators.required)
        this.logPassword = new FormControl('',Validators.required)
        this.loginForm = new FormGroup({
            logUsername:this.logUsername,
            logPassword:this.logPassword
        })
        //Signup Form
        this.sigUsername = new FormControl('',Validators.required);
        this.sigEmail = new FormControl('',Validators.required);
        this.sigPassword = new FormControl('',Validators.required);
        this.sigPasswordRep = new FormControl('',Validators.required);
        this.sigPasswordAdmin = new FormControl('',Validators.required);
        this.signupForm = new FormGroup({
            sigUsername:this.sigUsername,
            sigEmail:this.sigEmail,
            sigPassword:this.sigPassword,
            sigPasswordRep:this.sigPasswordRep,
            sigPasswordAdmin:this.sigPasswordAdmin
        })
        
        }
    login(fValues){
        
       let subject = this.auth.login(fValues.logUsername,fValues.logPassword);
       
       subject.subscribe(resp => {
            if(resp){
                if(resp.json().status == 'failed'){
                    console.log('Failed to login');
                    }
                else{
                    this.router.navigate(['/home']);
                }
            }
            else{
                console.log('No Response');
            }
            
        });

    }
    signup(fValues){
        let user:IUser = {
                username:fValues.sigUsername,
                email:fValues.sigEmail
                }
        let subject = this.auth.signup(user,fValues.sigPassword,fValues.sigPasswordAdmin);
        subject.subscribe(res=>
        {
            res._body = JSON.parse(res._body)
            if(res._body.status == 'exists'){}
            else if(res._body.status == 'error'){}
            else{
                
            }
        })
    }
    
    //form validation logic here
    //     validEmail(){
    //      return (this.firstName.valid || this.firstName.untouched);
    //   }
    validInputField(fieldRef){
        return (!fieldRef.hasError('required') || fieldRef.pristine);
    }

    
    
}