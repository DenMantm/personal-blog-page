import {Component, Inject, ViewChild, Renderer, NgZone}  from '@angular/core';
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
      private sub: any;
    
    currentUser:any;
    SNIPPETS:SnippetInstanceObjGroup[];
    currentSgroup:SnippetInstanceObjGroup;
    menuIsSelected:boolean;
    showElementTools:boolean;
    editor:any;
    
    @ViewChild('titleText') titleText;
    constructor(@Inject(JQUERY_TOKEN) private $,
                private saveSnippet:SaveObjectService,
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
    this.sub.unsubscribe();
  }
  
  
  
    ngOnInit() {
        
        
        
       this.SNIPPETS = this.route.snapshot.data['SNIPPETS'];
       this.currentUser = this.route.snapshot.data['User'];
       // In case if wrong parametre it will redirect to default snippet..
            
           this.sub = this.route.params.subscribe(params => {
               if(params['sGroup']){
                    this.sGroup = params['sGroup'];
                    
                    var result = this.SNIPPETS.filter( obj => {
                         return obj.id == +this.sGroup });
                    
                         
                    if(!result[0]){
                        this.currentSgroup = this.SNIPPETS[0];
                    }
                    else{
                        this.currentSgroup = result[0];
                    }
                    //console.log('param_'+this.sGroup);
               }
               else {
                   this.currentSgroup = this.SNIPPETS[0];
               }
               
       // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
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
    //   this.zone.run(() => {
    //         console.log('enabled time travel');
    //     });
        //workaround - in order to enable editing on the newly created element
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
                   this.zone.run(() => {
            console.log('enabled time travel');
        });
            
            
            console.log(this.SNIPPETS);
            
            this.saveSnippet.saveSnippets(this.SNIPPETS);
            PR.prettyPrint();
        }
   
   
}