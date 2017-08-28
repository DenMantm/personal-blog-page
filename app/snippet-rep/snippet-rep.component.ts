import {Component, Inject, ViewChild, Renderer, NgZone}  from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JQUERY_TOKEN,SaveObjectService,ArrayUtilityService,ContenteditableModelText,ContenteditableModelHtml } from '../common/index';
import { SnippetInstanceObj,SnippetInstanceObjGroup } from './common/snippet-rep.snippet-object';
import { AuthService } from '../user/index';
declare var PR;
declare var Aloha;
declare var MediumEditor;

@Component({
    templateUrl:'app/snippet-rep/snippet-rep.component.html',
    styles:[`.switcher-background{background-color: #f6f8fa;}
            .border{border:1px solid gray;margin-bottom:5px}
            .controls button {float:right;margin:bottom:10px}
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
                private arrayUtil:ArrayUtilityService){

         //this.isIn = false;
    }
    //refreshing the code pretify
      ngAfterViewChecked(){
      PR.prettyPrint();
      
     } 
  ngAfterViewInit(){
      this.renderer.invokeElementMethod(this.titleText.nativeElement, 'addEventListener', ['animationend', (e) => {
        this.menuIsSelected=false;
    }]);
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
        setTimeout(function(){ this.editor = new MediumEditor('.editable'); }, 500);
   }
   addElement(list){
        this.arrayUtil.addNewElement(list);
        
        setTimeout(function(){ this.editor = new MediumEditor('.editable'); }, 500);
   }
   
   editClick(){
       //Extra variable here
       this.showElementTools = true;
        this.editor = new MediumEditor('.editable');
        
        // this.$('.summernote').summernote();    
            
            // 	this.$('.editable').aloha();
            // Aloha.jQuery('.editable').aloha();

            
            
        // this.$('.editable').hallo({
        //   plugins: {
        //     'halloindicator': {},
        //     'halloformat': {},
        //     'halloheadings': {},
        //     'hallojustify': {},
        //     'hallolists': {},
        //     'hallolink': {},
        //     'halloreundo': {},
        //     // 'halloimage': {
        //     //     search: function(query, limit, offset, successCallback) {
        //     //         response = {offset: offset, total: limit + 1, assets: searchresult.slice(offset, offset+limit)};
        //     //         successCallback(response);
        //     //     },
        //     //     suggestions: null,
        //     //     uploadUrl: function() {
        //     //       return '/some/example/url'
        //     //     }
        //     // }
        //   },
        //   editable: true,
        //   toolbar: 'halloToolbarFixed'
        // })
        // .hallo('protectFocusFrom', this.$('#enable'));
        
        

        // this.$('.editable').bind('hallomodified', function(event, data) {
        //     this.$('#modified').html("Editables modified");
        // });
        // this.$('.editable').bind('halloselected', function(event, data) {
        //     this.$('#modified').html("Selection made");
        // });
        // this.$('.editable').bind('hallounselected', function(event, data) {
        //     this.$('#modified').html("Selection removed");
        // });
        }
        disableClick(){
            this.showElementTools = false;
            
            // this.$('.editable').hallo({editable: false});
           // this.$('.editable').mahalo();
        }
        saveClick(){
                   this.zone.run(() => {
            console.log('enabled time travel');
        });
            
            
            console.log(this.SNIPPETS);
            
            this.saveSnippet.saveSnippets(this.SNIPPETS);
            PR.prettyPrint();
        }
   
   

// enable(){
//         this.$('.editable').hallo({
//           plugins: {
//             'halloindicator': {},
//             'halloformat': {},
//             'halloheadings': {},
//             'hallojustify': {},
//             'hallolists': {},
//             'hallolink': {},
//             'halloreundo': {},
//             // 'halloimage': {
//             //     search: function(query, limit, offset, successCallback) {
//             //         response = {offset: offset, total: limit + 1, assets: searchresult.slice(offset, offset+limit)};
//             //         successCallback(response);
//             //     },
//             //     suggestions: null,
//             //     uploadUrl: function() {
//             //       return '/some/example/url'
//             //     }
//             // }
//           },
//           editable: true,
//           toolbar: 'halloToolbarFixed'
//         })
//         .hallo('protectFocusFrom', this.$('#enable'));

//         // this.$('.editable').bind('hallomodified', function(event, data) {
//         //     this.$('#modified').html("Editables modified");
//         // });
//         // this.$('.editable').bind('halloselected', function(event, data) {
//         //     this.$('#modified').html("Selection made");
//         // });
//         // this.$('.editable').bind('hallounselected', function(event, data) {
//         //     this.$('#modified').html("Selection removed");
//         // });
// }
// disable(){
//     this.$('.editable').hallo({editable: false});
// }
// checkObject(){
//     console.log(this.SNIPPETS);
//     this.saveSnippet.saveSnippets(this.SNIPPETS);
//     PR.prettyPrint();
// }

// SNIPPETS:SnippetInstanceObj[] = [{
//     id:0,
//     group:'Angular2',
//     titleText:'Snippet 1',
//     topNoteText:'Top Text of the snippet',
//     codeText:`import {Component, ViewChild, ElementRef, AfterViewInit,OnInit, Inject} from '@angular/core';
// import { AuthService } from '../user/auth.service';
// import { ActivatedRoute } from '@angular/router';
// import { JQUERY_TOKEN } from '../common/index';


// @Component({
//     templateUrl:'./app/home/home.component.html',
// 		styles:[\`h1 {color:red;}\`]
// })


// export class HomeComponent implements OnInit {
// 		ngOnInit(): void {
// 			this.user = this.route.snapshot.data['user'];
// 		}
// 	user:any;
// 	constructor(
// 	private route:ActivatedRoute,	
// 	private auth:AuthService,
// 	@Inject(JQUERY_TOKEN) private $){
// 	}
//   ngAfterViewInit() {
    
//   }
// 	ngOnChanges(){
// 		this.user = this.auth.getCurrentUser();
// 	}


// }`,
//     bottomNoteText:'Bottom text of the snippet'
// },
// {
//     id:1,
//     group:'Angular2',
//     titleText:'Snippet 2',
//     topNoteText:'Top Text of the snippet',
//     codeText:'Snippet code here',
//     bottomNoteText:'Bottom text of the snippet'
// },
// {
//     id:2,
//     group:'Angular2',
//     titleText:'Snippet 3',
//     topNoteText:'Top Text of the snippet',
//     codeText:'Snippet code here',
//     bottomNoteText:'Bottom text of the snippet'
// }]
}