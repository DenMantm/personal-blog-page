import { Component, HostListener, ElementRef, HostBinding,enableProdMode } from '@angular/core';


//enableProdMode();

@Component({
    selector:'body',
    template:`<navbar-component></navbar-component>
              <router-outlet></router-outlet>
              <footer-component></footer-component>`
})

export class MyAppComponent {
         
constructor(){

}


}