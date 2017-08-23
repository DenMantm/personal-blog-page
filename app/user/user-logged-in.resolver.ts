import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService,  } from './index';
 
@Injectable()
export class UserLoggedInResolver implements Resolve<any>{
    constructor(private auth:AuthService){}
    resolve():any{
        if(this.auth.getUserLoginResolverTriede()){
            console.log('1 working');
            console.log(this.auth.getCurrentUser());
            return this.auth.getCurrentUser();
        }
        else{
            console.log('2 working');
            this.auth.setUserLoginResolverTriede();
            console.log(this.auth.isAuthenticatedOnServer().subscribe(resp=>{
                console.log(resp)
                return(resp);
            }));
            this.auth.isAuthenticatedOnServer().subscribe(resp=>resp);
        }

    }
}
