import {Component, Inject}  from '@angular/core';
import { JQUERY_TOKEN } from '../common/index';
import { SnippetInstanceObj } from './common/snippet-rep.snippet-object';
import { ContenteditableModel } from './common/snippet-rep.snippet-directive';


@Component({
    templateUrl:'app/snippet-rep/snippet-rep.component.html'
})

export class SnippetRepository{
    constructor(@Inject(JQUERY_TOKEN) private $){
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
}

SNIPPETS:SnippetInstanceObj[] = [{
    id:0,
    group:'Angular2',
    titleText:'Snippet 1',
    topNoteText:'Top Text of the snippet',
    codeText:'Snippet code here',
    bottomNoteText:'Bottom text of the snippet'
},
{
    id:1,
    group:'Angular2',
    titleText:'Snippet 2',
    topNoteText:'Top Text of the snippet',
    codeText:'Snippet code here',
    bottomNoteText:'Bottom text of the snippet'
},
{
    id:2,
    group:'Angular2',
    titleText:'Snippet 3',
    topNoteText:'Top Text of the snippet',
    codeText:'Snippet code here',
    bottomNoteText:'Bottom text of the snippet'
}]
}