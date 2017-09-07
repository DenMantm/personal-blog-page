import { Component, Inject, Input, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    .switcher-background{background-color: #f6f8fa;}
            .border{border:1px solid gray;margin-bottom:5px}
            .controls button {float:right;margin-bottom:10px}
            .controls {height: 0px;
    position: absolute;
    z-index: 100;
    width: 94%;}
    nav {margin-bottom:20px}
    
    `]
})
export class SnippetRepSidebar {
    @Input() SNIPPETS:any;
    @Input() currentlySelected:any;
    @Input() showElementTools:boolean;
    @Output() selectClick = new EventEmitter();
    createSGroup:FormGroup;
    snippetGroupName:FormControl;
    snippetGroupDescription:FormControl;
    
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
        //console.log(this.currentlySelected);
        
        this.snippetGroupName = new FormControl('',Validators.required)
        this.snippetGroupDescription = new FormControl('',Validators.required)
        this.createSGroup = new FormGroup({
            snippetGroupName:this.snippetGroupName,
            snippetGroupDescription:this.snippetGroupDescription
        })
        
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
   createSnippetGroup(fValues){
       //latter on create modal with the form...
        let tmpSgroup = {groupName:fValues.snippetGroupName,
                         shortDescription:fValues.snippetGroupDescription};
        
        this.objectService.createSnippetGroup(tmpSgroup).subscribe( 
            
            (res:any) => {
                let newEntity = JSON.parse(res._body);
                console.log(newEntity);
                this.router.navigate(['/snippet-repository',newEntity.id]);
                
                
            });
       
       
   }
       //universal validator
    validInputField(fieldRef){
        return (!fieldRef.hasError('required') || fieldRef.pristine);
    }
}