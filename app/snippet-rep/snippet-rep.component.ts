import {Component, Inject, ViewChild, Renderer, NgZone}  from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import {JQUERY_TOKEN,
        SaveObjectService,
        ArrayUtilityService,
        ContenteditableModelText,
        ContenteditableModelHtml, 
        MediumEditorService 
        } from '../common/index';
import { SnippetInstanceObj,SnippetInstanceObjGroup } from './common/snippet-rep.snippet-object';
import { AuthService } from '../user/index';
declare var PR;
declare var swal;


@Component({
    templateUrl:'app/snippet-rep/snippet-rep.component.html',
    styles:[`.switcher-background{background-color: #f6f8fa;}
            .border{border:1px solid gray;margin-bottom:5px}
            .controls button {float:right;margin-bottom:10px}
            .controls {height: 0px;
    position: absolute;
    z-index: 100;
    width: 94%;}`]
})

export class SnippetRepository{
    
      sGroup: string;
    
    currentUser:any;
    SNIPPETS:SnippetInstanceObjGroup[];
    currentSgroup:SnippetInstanceObjGroup;
    lastStateCurrentSgroup:SnippetInstanceObjGroup;
    menuIsSelected:boolean;
    showElementTools:boolean;
    editor:any;
    
    @ViewChild('titleText') titleText;
    constructor(@Inject(JQUERY_TOKEN) private $,
                private objectService:SaveObjectService,
                private route:ActivatedRoute,
                private router:Router,
                private renderer:Renderer,
                private auth:AuthService,
                private zone:NgZone,
                private arrayUtil:ArrayUtilityService,
                private medium:MediumEditorService){

         //this.isIn = false;
    }
    //refreshing the code pretify
      ngAfterViewChecked(){
      PR.prettyPrint();
      
     } 
  ngAfterViewInit(){
    // this.renderer.invokeElementMethod(this.titleText.nativeElement, 'addEventListener', ['transitionend', (e) => {
    //     console.log(e);
    // }]);
  }

  ngOnDestroy() {
  }
    ngOnInit() {
        
    //   this.SNIPPETS = this.route.snapshot.data['SNIPPETS'];
       this.currentUser = this.route.snapshot.data['User'];
       this.route.data.subscribe((res:any)=>{ 
           this.currentSgroup =  JSON.parse(res['currentSgroup']._body);
           this.lastStateCurrentSgroup = JSON.parse(res['currentSgroup']._body);
           this.SNIPPETS = JSON.parse(res['SNIPPETS']._body);
           
       })

   }
   
   select(value){
       this.menuIsSelected = true;
       this.currentSgroup = this.SNIPPETS.filter(e => e.groupName == value)[0];
       
        this.renderer.invokeElementMethod(this.titleText.nativeElement, 'addEventListener', ['animationend', (e) => {
        this.menuIsSelected=false; }]);
       
   }
   loginCheck(){
       return this.auth.isAuthenticated();
   }
   remove(item,itemList){
        this.arrayUtil.removeItem(item,itemList);
   }
   moveDown(item,itemList){
       
      this.arrayUtil.moveItemDown(item,itemList); 
   }
   moveUp(item,itemList){
       
       this.arrayUtil.moveItemUp(item,itemList); 
   }
   addSnippet(){
       this.arrayUtil.addNewSnippet(this.currentSgroup);

        setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   addElementDiv(list){
        this.arrayUtil.addNewElementDiv(list);
        setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   addElementPre(list){
        this.arrayUtil.addNewElementPre(list);
        setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   
   editClick(){
       //Extra variable here
       this.showElementTools = true;
        this.editor = this.medium.createInstance()
        }
        disableClick(){
            this.showElementTools = false;
            this.editor.destroy();
            
        }
        saveClick(){
             this.objectService.editSnippetGroup(this.currentSgroup).subscribe((res:any) => {
                 //this.lastStateCurrentSgroup = JSON.parse(res._body)
                this.lastStateCurrentSgroup =  this.arrayUtil.deepCopy(this.currentSgroup);
             }   );
            PR.prettyPrint();
        }
        
        canDeactivate():any {
    if (JSON.stringify(this.currentSgroup) !== JSON.stringify(this.lastStateCurrentSgroup) ) {
        
        let obs;
        
        let promise = new Promise<any>( subsc => obs = subsc );
        
        // let userResponse = false;
        
        swal({
          title: "Are you sure?",
          text: "Discard changes?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
          if (isConfirm) {
            //swal("Deleted!", "Your imaginary file has been deleted.", "success");
            obs(true);
            //userResponse = true;
          } else {
            //swal("Cancelled", "Your imaginary file is safe :)", "error");
            //userResponse = false;
            obs(false);
          }
        });
        //console.log(userResponse);
        
        
        return promise.then(res => res)
        
           // if(userResponse) this.showElementTools = false;
        
     // return userResponse
      
      
    }
    else{
        this.showElementTools = false;
        return true;
    }

}

}