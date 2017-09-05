import { Component, Inject, Input, Output, EventEmitter  } from '@angular/core';
import { JQUERY_TOKEN, ScrollToElementService,SaveObjectService } from '../../common/index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../user/index';


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
    @Input() currentlySelected:any;
    @Output() selectClick = new EventEmitter();
    //currentlySelected:number;
    constructor(@Inject(JQUERY_TOKEN) private $,
                private scroll:ScrollToElementService,
                private router:Router,
                private auth:AuthService,
                private objectService:SaveObjectService){
        //in the future will introduce local storage saving to allow tracking of where it was left
    }
    ngOnInit(){
        //console.log(this.curSel);
        console.log(this.currentlySelected);
        }
    
    // select(selection){
        
    //     //if item is not already selected emmitting change
    //      if(this.currentlySelected !== selection.id){
    //         this.currentlySelected = selection.id;
    //         //this.selectClick.emit(selectValue);
    //         //this.router.navigate(['/snippet-repository', selection.id ]);
    //      }
    // }
    scrollTo(id){
        console.log(id);
        this.scroll.scrollTo(id);
    }
      loginCheck(){
       return this.auth.isAuthenticated();
   }
   createSnippetGroup(){
       //latter on create modal with the form...
        let tmpSgroup = {groupName:'NewGroup',
                         shortDescription:'new snippet group description'};
        
        this.objectService.createSnippetGroup(tmpSgroup).subscribe( 
            
            (res:any) => {console.log(JSON.parse(res._body))
                
            });
       
       
   }
}