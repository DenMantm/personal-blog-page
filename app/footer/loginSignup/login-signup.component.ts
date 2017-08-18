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
    
    //failure return valuse from the server
    logErrorWrongCredentials:boolean;
    sigErrorWrongUsername:boolean;
    //Collecting information about already existing user trys
    sigExistingUserList:string[];
    
    constructor(@Inject(JQUERY_TOKEN) private $,
                private auth:AuthService,
                private router:Router){
                    this.sigExistingUserList = ['den'];
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
        this.sigUsername = new FormControl('',[Validators.required],this.validSignUserName.bind(this));
        this.sigEmail = new FormControl('',[Validators.required,this.validEmail]);
        this.sigPassword = new FormControl('',Validators.required);
        this.sigPasswordRep = new FormControl('',Validators.required,this.validRepPassword.bind(this));
        this.sigPasswordAdmin = new FormControl('',Validators.required);
        this.signupForm = new FormGroup({
            sigUsername:this.sigUsername,
            sigEmail:this.sigEmail,
            sigPassword:this.sigPassword,
            sigPasswordRep:this.sigPasswordRep,
            sigPasswordAdmin:this.sigPasswordAdmin
        })
        
        //In case if someone wants to go and change password in its field
        this.sigPassword.valueChanges.subscribe(data => {
            if(this.sigPasswordRep.value !== '')this.sigPasswordRep.updateValueAndValidity();
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
                    console.log('success');
                    this.router.navigate(['/landingPage']);
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
            console.log(res._body);
            res._body = JSON.parse(res._body)
            console.log(res._body);
            if(res._body.status == 'exists'){
                this.sigExistingUserList.push(fValues.sigUsername.toLowerCase());
                this.sigErrorWrongUsername = true;
            }
            else if(res._body.status == 'error'){console.log('There was an error on DB Server side...')}
            else if(res._body.status == 'created'){
                //Logic to redirect??
                this.router.navigate(['/landingPage']);
            }
        })
    }
    
    //form validation logic here
    
    //universal validator
    validInputField(fieldRef){
        return (!fieldRef.hasError('required') || fieldRef.pristine);
    }
    
    validSigUserField(){
        return this.sigUsername.hasError('userExists')||this.sigErrorWrongUsername;
    }
    
    // Checking if user have already tried to use this name already as well
    validSignUserName(fieldControl: FormControl): Promise<any> {
       return new Promise(resolve => {
       if ( this.sigExistingUserList.includes(fieldControl.value.toLowerCase()) ){
           this.sigErrorWrongUsername = false;
          resolve({"userExists":true});
       }
       else
          this.sigErrorWrongUsername = false;
          resolve(null)
        });
          };
          
    validSigPassRepField(){
        return this.sigPasswordRep.hasError('passwordNotMatch');
    }
    
    //comparing both password fields
    validRepPassword(fieldControl: FormControl): Promise<any> {
       return new Promise(resolve => {
            if (fieldControl.value!==this.sigPassword.value)  resolve({"passwordNotMatch":true});
       else resolve(null);
    });
      };
     
    validSigEmailField(){
        return this.sigEmail.hasError('incorrectMailFormat');
    }
    validEmail(fieldControl: FormControl){
         var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (fieldControl.value != '' && !EMAIL_REGEXP.test(fieldControl.value)) {
            return { "incorrectMailFormat": true };
        }
        return null;
        
    }
}
