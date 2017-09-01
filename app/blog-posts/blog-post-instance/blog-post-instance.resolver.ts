import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SaveObjectService } from '../../common/save-object-service';
 
@Injectable()
export class BlogPostInstanceResolverService implements Resolve<any>{
    constructor(private objectService:SaveObjectService){}
    resolve(route: ActivatedRouteSnapshot){
        
            let blogId = route.params['blogId'];
            console.log(blogId);
            
            return this.objectService.loadBlogPost(blogId).map( resp => resp );
            
    }
}
