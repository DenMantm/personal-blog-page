import { Injectable } from '@angular/core';
import { IUser } from './user.model'
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
//import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";


@Injectable()
export class AuthService{
    currentUser:IUser;
    loginSubject:any;
    
    
    constructor(private router:Router,private http:Http){

    }

    isAuthenticated(){
       // console.log(new Error().stack);
     //   console.log("DEBUG HERE: "+!!this.currentUser);
    //    if(!!!this.currentUser){
    //         return !!this.isAuthenticatedOnServer().then(res=>{
    //         if(res.id == undefined){
    //           return false;
    //         }else{
    //           return true;
    //         }
    //     });


    //    }else{
    //        return true;
    //    }
    
        return !!this.currentUser;
    }
    isAuthenticatedOnServer(){
       return this.http.get('/api/currentIdentity').map( (response:any) =>{
            if(response._body){
                this.currentUser = response.json();
                return response.json();
            }
            else{
                return {}
            }
        });
    }
    login(username,password){
        //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        let loginInfo = {username:username,password:password};
        this.loginSubject = this.http.post('/api/login',JSON.stringify(loginInfo),options);

        return this.loginSubject.do(resp => {
                 //assign value to the user
                 if(resp.json().user)
                 this.currentUser = resp.json().user;
        });
    }
        signup(user,password,adminPassword){
            console.log('signing up');
        //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        let loginInfo = {
                        user:user,
                        password:password,
                        adminPassword:adminPassword
                        }
                        
        this.loginSubject = this.http.post('/api/signup',JSON.stringify(loginInfo),options);

        return this.loginSubject.do(resp => {
                 //assign value to the user
                 if(resp.json().user)
                 this.currentUser = resp.json().user;
        });
    }
        changeUserSettings(updatedUser){
        //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        //let loginInfo = {username:username,password:password};

        console.log(updatedUser);

        return this.http.post('/api/changeSettings',JSON.stringify(updatedUser),options).do(
            resp =>{ if(resp){
                // this.currentUser = resp.json().user;
                // this.router.navigate(['/home']);
                console.log('SPINNNINNNGG!!!');
                
            }
        }).catch(error =>{
                return Observable.of(false);
            })
        // this.currentUser = {id:1, 
        //             username:username,
        //             firstName:'Deniss' }

        
        //return true
    }
    logout(){
             this.http.get('/api/logout').do(
            resp =>{ if(resp){
                console.log('working')
                this.currentUser = null
                this.router.navigate(['/landingPage']);
            }
        }).subscribe();
    }
    
    getCurrentUser(){
        return this.currentUser;
    }
    
}