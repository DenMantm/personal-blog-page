import {Component, Inject}  from '@angular/core';
import { JQUERY_TOKEN } from '../common/index';


@Component({
    templateUrl:'app/snippet-rep/snippet-rep.snippet-instance.html'
})

export class SnippetInstance{
    constructor(@Inject(JQUERY_TOKEN) private $){
}
}