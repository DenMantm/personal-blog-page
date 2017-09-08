import { Component, Inject, Input } from '@angular/core';
import { JQUERY_TOKEN } from '../../common/index';


@Component({
    selector: 'blog-post-headder',
    templateUrl: 'app/blog-posts/blog-post-headder-descriptor/blog-post-headder-descriptor.component.html',
    styles: [`

    `]
    //     styles: [`.nav.navbar-nav {font-size:15px;}
    // #searchForm {margin-right: 100px;}
    // @media (max-width:1200px){#searchForm {display:none} }
    // li > a.active{color:red;}`]
})

export class BlogPostHeadderDescriptorComponent {
    
    @Input()blogPost:any;
    
    constructor(@Inject(JQUERY_TOKEN) private $){
    }
    ngOnInit(){
        console.log(this.blogPost);
    }

}