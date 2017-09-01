import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { Http } from '@angular/http';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthService,private router:Router) {
  }

  canActivate() {
    // console.log("Running Guard Service");

    //   if(!this.auth.isAuthenticated()){
    //     return !!this.auth.isAuthenticatedOnServer().subscribe(res=>{
    //         if(res.id == undefined){
    //           this.router.navigate(['landingPage']);
    //           return false;
    //         }else{
    //           return true;
    //         }
    //     });
    //   }
    //   else return true;

    // //return this.auth.isAuthenticated();
    return true;
  }
}