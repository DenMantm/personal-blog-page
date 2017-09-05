import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { SaveObjectService } from '../../common/save-object-service';
 
@Injectable()
export class SnippetListResolverService implements Resolve<any>{
    constructor(private objectService:SaveObjectService){}
    resolve(){
            
            return this.objectService.loadSnippetGroupList().map( resp => resp );
    }
}
