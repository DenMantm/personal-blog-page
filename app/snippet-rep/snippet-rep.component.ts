import {Component, Inject}  from '@angular/core';
import { JQUERY_TOKEN } from '../common/index';


@Component({
    templateUrl:'app/snippet-repository/snippet-repository.component.html'
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
        this.$('.editable').bind('hallomodified', function(event, data) {
            this.$('#modified').html("Editables modified");
        });
        this.$('.editable').bind('halloselected', function(event, data) {
            this.$('#modified').html("Selection made");
        });
        this.$('.editable').bind('hallounselected', function(event, data) {
            this.$('#modified').html("Selection removed");
        });
}
disable(){
    this.$('.editable').hallo({editable: false});
}
}