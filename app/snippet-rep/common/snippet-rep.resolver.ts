import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SaveObjectService } from '../../common/save-object-service';
 
@Injectable()
export class SnippetRepResolverService implements Resolve<any>{
    constructor(private saveSnippet:SaveObjectService){}
    resolve(){
        //git this fixed
        return this.saveSnippet.loadSnippets('angular2').map((SNIPPETS:any) => JSON.parse(SNIPPETS._body));
    }
}
