import { Component, Inject, Input } from '@angular/core';
import { JQUERY_TOKEN } from '../../common/index';


@Component({
    selector: 'blog-post-headder',
    template: `
  <a [routerLink]="['/blog-posts',blogPost._id]" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{blogPost.title}}</h5>
      <small>By {{blogPost.author}}</small>
    </div>
    <p class="mb-1">{{blogPost.description}}</p>
    <small>Post was created at {{blogPost.date | date: 'dd/MM/yyyy HH:MM'}}</small>
  </a>
    `,
    styles: [``]
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