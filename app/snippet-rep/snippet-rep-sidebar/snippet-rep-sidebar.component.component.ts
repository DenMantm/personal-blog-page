import { Component, Inject, Input, Output, EventEmitter  } from '@angular/core';
import { JQUERY_TOKEN } from '../../common/index';


@Component({
    selector: 'snippet-rep-sidebar',
    templateUrl: 'app/snippet-rep/snippet-rep-sidebar/snippet-rep-sidebar.component.html',
    styles: [`.sub{
        border: 1px solid black;
    }
    .hand { cursor: pointer; cursor: hand; }
    .selected {color:red}`]
})

export class SnippetRepSidebar {
    @Input() SNIPPETS:any;
    @Output() selectClick = new EventEmitter();
    currentlySelected:string;
    constructor(@Inject(JQUERY_TOKEN) private $){
    }
    ngOnInit(){
        }
    select(selectValue){
        this.currentlySelected = selectValue;
        this.selectClick.emit(selectValue);
    }
}