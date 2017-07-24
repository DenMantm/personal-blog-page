import {Component, Inject}  from '@angular/core';
import { JQUERY_TOKEN } from '../../common/index';
import { SnippetInstanceObj } from '../common/snippet-rep.snippet-object';


@Component({
    templateUrl:'app/snippet-rep/snippet-instance/snippet-rep.snippet-instance.html'
})

export class SnippetInstance{
    constructor(@Inject(JQUERY_TOKEN) private $){
}
}

