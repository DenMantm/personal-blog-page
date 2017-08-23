import { Component, Inject, Input, Output, EventEmitter  } from '@angular/core';
import { JQUERY_TOKEN } from '../../common/index';


@Component({
    selector: 'snippet-rep-sidebar',
    templateUrl: 'app/snippet-rep/snippet-rep-sidebar/snippet-rep-sidebar.component.html',
    styles: [`.sub-menu-e{
        padding:0px;
        margin-left: 10px;
    }
    .main-menu-e{
        padding:0px;
    }
    .selected {color:red !important}
    .main-block{padding-right:5%;
    padding-left:5%}
    
    `]
})
export class SnippetRepSidebar {
    @Input() SNIPPETS:any;
    @Output() selectClick = new EventEmitter();
    currentlySelected:string;
    constructor(@Inject(JQUERY_TOKEN) private $){
        //in the future will introduce local storage saving to allow tracking of where it was left
        this.currentlySelected = 'Angular2';
    }
    ngOnInit(){
        }
    
    select(selectValue){
        //if item is not already selected emmitting change
         if(this.currentlySelected !== selectValue){
            this.currentlySelected = selectValue;
            this.selectClick.emit(selectValue);
         }

    }
}