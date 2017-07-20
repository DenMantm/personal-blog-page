import { Component, Inject } from '@angular/core';
import { JQUERY_TOKEN } from '../common/index';


@Component({
    selector: 'navbar-component',
    templateUrl: 'app/nav/navbar.component.html',
    styles: [`.banner{
        height:400px;
        border: 1px solid black;
    }`]
    //     styles: [`.nav.navbar-nav {font-size:15px;}
    // #searchForm {margin-right: 100px;}
    // @media (max-width:1200px){#searchForm {display:none} }
    // li > a.active{color:red;}`]
})

export class NavbarComponent {
    constructor(@Inject(JQUERY_TOKEN) private $){
    }
    ngOnInit(){
        }
}