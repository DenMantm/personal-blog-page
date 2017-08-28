import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../user/auth.service';

declare var PR;
@Component({
    selector: 'content-edit-nav',
    templateUrl: 'app/content-edit-nav/content-edit-nav.component.html',
    styles: [``]
    //     styles: [`.nav.navbar-nav {font-size:15px;}
    // #searchForm {margin-right: 100px;}
    // @media (max-width:1200px){#searchForm {display:none} }
    // li > a.active{color:red;}`]
})

export class ContentEditNav {
    
    editPressed:boolean
    
    //All posible scenarios here
    @Output() editClick = new EventEmitter();
    @Output() disableClick = new EventEmitter();
    @Output() saveClick = new EventEmitter();
    
        constructor(private auth:AuthService){
        }
        edit(){
            this.editPressed = true;
            this.editClick.emit();
        }
        disable(){
            this.editPressed = false;
            this.disableClick.emit();
        }
        saveObject(){
            this.saveClick.emit();
        }
        logout(){
            this.auth.logout();
        }
}