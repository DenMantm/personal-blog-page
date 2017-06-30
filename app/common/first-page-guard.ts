import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Injectable()
export class FirstPageGuard implements CanActivate {
  constructor(private auth: AuthService,private router:Router) {
  }

  canActivate() {
      if(!this.auth.isAuthenticated()){
        return !!this.auth.isAuthenticatedOnServer().then(res=>{
            if(res.id == undefined){
              return true;
            }else{
              this.router.navigate(['/home']);
              return false;
            }
        });
      }
      else return true;

    //return this.auth.isAuthenticated();
  }
}