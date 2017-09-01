import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService,  } from './index';
 
@Injectable()
export class UserLoggedInResolver implements Resolve<any>{
    constructor(private auth:AuthService){}
    resolve():any{
        if(this.auth.getUserLoginResolverTriede()){
            return this.auth.getCurrentUser();
        }
        else{
            this.auth.setUserLoginResolverTriede();
            
            return this.auth.isAuthenticatedOnServer().map((resp:any) => resp._body );
            
        }

    }
}
