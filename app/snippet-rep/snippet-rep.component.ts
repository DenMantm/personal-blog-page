import {Component, Inject}  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JQUERY_TOKEN,SaveObjectService } from '../common/index';
import { SnippetInstanceObj,SnippetInstanceObjGroup } from './common/snippet-rep.snippet-object';
import { ContenteditableModel } from './common/snippet-rep.snippet-directive';
declare var PR;

@Component({
    templateUrl:'app/snippet-rep/snippet-rep.component.html'
})

export class SnippetRepository{
    SNIPPETS:SnippetInstanceObjGroup[];
    currentSgroup:SnippetInstanceObjGroup;
    constructor(@Inject(JQUERY_TOKEN) private $,private saveSnippet:SaveObjectService,private route:ActivatedRoute){
}
    //refreshing the code pretify
      ngAfterViewChecked(){
      PR.prettyPrint();
  }
       ngOnInit() {
       this.SNIPPETS = this.route.snapshot.data['SNIPPETS'];
       this.currentSgroup = this.SNIPPETS[0];
   }
   select(value){
       this.currentSgroup = this.SNIPPETS.filter(e => e.groupName == value)[0];
   }

enable(){
        this.$('.editable').hallo({
          plugins: {
            'halloindicator': {},
            'halloformat': {},
            'halloheadings': {},
            'hallojustify': {},
            'hallolists': {},
            'hallolink': {},
            'halloreundo': {},
            // 'halloimage': {
            //     search: function(query, limit, offset, successCallback) {
            //         response = {offset: offset, total: limit + 1, assets: searchresult.slice(offset, offset+limit)};
            //         successCallback(response);
            //     },
            //     suggestions: null,
            //     uploadUrl: function() {
            //       return '/some/example/url'
            //     }
            // }
          },
          editable: true,
          toolbar: 'halloToolbarFixed'
        })
        .hallo('protectFocusFrom', this.$('#enable'));

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
disable(){
    this.$('.editable').hallo({editable: false});
}
checkObject(){
    console.log(this.SNIPPETS);
    this.saveSnippet.saveSnippets(this.SNIPPETS);
    PR.prettyPrint();
}

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