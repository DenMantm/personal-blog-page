import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class SaveObjectService{
  constructor(private auth: AuthService,private router:Router,private http:Http) {
  }
  saveSnippets(snippetObject){
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        let loginInfo = snippetObject;

        this.http.post('/api/snippets',JSON.stringify(loginInfo),options).subscribe(resp => {
            if(resp){
                //console.log();
                
                if(resp.json().status == 'failed'){
                    console.log('Failed to save');
                    }
                else{
                    console.log('Saved');
                }
            }
            else{
                console.log('No Response');
                
            }
            
        });
  }
    loadSnippets(snippetType){
        let requestOptions = new RequestOptions({search:snippetType});

        return this.http.get('/api/snippets',requestOptions).do(
            resp =>{ if(resp){
                console.log('working, loaded snippets');
                
            }
            else if (resp == undefined){
                //if user is not logged in
                this.router.navigate(['/notLoggedError']);
            }
        });
    }
    loadBlogPostList(){
        return this.http.get('/api/getBlogPostList');//.map(resp => resp.json());
    }
    loadBlogPost(blogId){
        
         let params: URLSearchParams = new URLSearchParams();
         params.set('blogId', blogId);
        
        
        return this.http.get('/api/getBlogPost',{search: params});//.map(resp => resp.json());
        
    }
    newBlogPost(newBlogPost){
        //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/createNewBlogPost',JSON.stringify(newBlogPost),options);
    }
    editBlogPost(blogPost){
        //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/editBlogPost',JSON.stringify(blogPost),options)

    }


}