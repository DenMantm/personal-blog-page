import { Component, Inject } from '@angular/core';
import { JQUERY_TOKEN } from '../common/index';


@Component({
    selector: 'navbar-component',
    templateUrl: 'app/nav/navbar.component.html',
    styles: [`.banner{
            display: inline-block;
            color:black;
            border: 7px solid #181818;
            padding: 1rem 2rem;
            font-size: 2.4rem;
            font-family: Fjalla One,Noto Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
            text-transform: uppercase;
            letter-spacing: 3px;
            line-height: 1.5;
            font-weight: 400;
}
    .headder{
            text-align: center;
            padding-top: 15vh;
            padding-bottom: 15vh;
    }
    .col{
            display: block;
        width: 90%;
        max-width: 980px;
        margin: 0 auto;
    }
    .prep{
        display: block;
        font-size: 1.4rem;
    }
    .nav-enhance{
            background-color: #f5f5f5;
            background-image: linear-gradient(to bottom, #FFFFFF, #e2e2e2);
    }
    `]
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