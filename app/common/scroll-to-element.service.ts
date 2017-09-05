import { Injectable, Inject } from '@angular/core';
import { JQUERY_TOKEN } from './index';


@Injectable()
export class ScrollToElementService{
    constructor(@Inject(JQUERY_TOKEN) private $){
    }
    scrollTo(id){
                this.$('html, body').animate({
                    scrollTop: this.$("#"+id).offset().top
                }, 1000);
    }
    
}
            
            
            
            
