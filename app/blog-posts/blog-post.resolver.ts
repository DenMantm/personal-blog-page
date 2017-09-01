import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SaveObjectService } from '../common/save-object-service';
 
@Injectable()
export class BlogPostListResolverService implements Resolve<any>{
    constructor(private objectService:SaveObjectService){}
    resolve(){
        //git this fixed
        return this.objectService.loadBlogPostList().map((res:any) => JSON.parse(res._body));
    }
}
