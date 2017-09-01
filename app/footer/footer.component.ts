import { Component, Inject } from '@angular/core';
import { JQUERY_TOKEN } from '../common/index';
import { AuthService } from '../user/auth.service';


@Component({
    selector: 'footer-component',
    templateUrl: 'app/footer/footer.component.html',
    styles: [``]
    //     styles: [`.nav.navbar-nav {font-size:15px;}
    // #searchForm {margin-right: 100px;}
    // @media (max-width:1200px){#searchForm {display:none} }
    // li > a.active{color:red;}`]
})

export class FooterComponent {
    
    constructor(@Inject(JQUERY_TOKEN) private $,
                private auth:AuthService){
    }
    ngOnInit(){
    }
    loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
    logout(){
            this.auth.logout();
    }
}