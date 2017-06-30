import { Component, HostListener, ElementRef, HostBinding,enableProdMode } from '@angular/core';
import { AuthService } from './user/auth.service';


//enableProdMode();

@Component({
    selector:'body',
    template:`<navbar-component *ngIf="isAuthenticated()"></navbar-component>
              <router-outlet></router-outlet>`
})

export class MyAppComponent {
         
constructor(private auth:AuthService){

}

isAuthenticated(){
    return this.auth.isAuthenticated();
}

}