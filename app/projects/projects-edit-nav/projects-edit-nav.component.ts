import { Component, Inject, Input } from '@angular/core';
import { JQUERY_TOKEN,SaveObjectService } from '../../common/index';

declare var PR;
@Component({
    selector: 'projects-edit-nav-component',
    templateUrl: 'app/projects/projects-edit-nav/projects-edit-nav.component.html',
    styles: [``]
    //     styles: [`.nav.navbar-nav {font-size:15px;}
    // #searchForm {margin-right: 100px;}
    // @media (max-width:1200px){#searchForm {display:none} }
    // li > a.active{color:red;}`]
})

export class ProjectsEditNav {
    
   // @Input() SNIPPETS:SnippetInstanceObjGroup[]
    constructor(@Inject(JQUERY_TOKEN) private $,private saveSnippet:SaveObjectService){
    }
    ngOnInit(){
        
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
            //console.log(this.SNIPPETS);
            //this.saveSnippet.saveSnippets(this.SNIPPETS);
            PR.prettyPrint();
        }
}