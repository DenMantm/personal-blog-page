import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { ToastrNotifyService } from './toastr-notify.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class SaveObjectService{
  constructor(  private auth: AuthService,
                private router:Router,
                private http:Http,
                private notify:ToastrNotifyService) {
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
        
        
        return this.http.get('/api/getBlogPost',{search: params}).do(res => {
            if (res.status == 1){
                this.notify.error('Cannot find entity in the DB');
            }
            else if (res.status == 2){
                this.notify.error('there was an error...');
            }
        });//.map(resp => resp.json());
        
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

        return this.http.post('/api/editBlogPost',JSON.stringify(blogPost),options).do(res => {
            if (res.status == 200){
                this.notify.success('Modified Succesfully');
            }
            else if (res.status == 1){
                this.notify.error('Cannot find entity in the DB');
            }
            else if (res.status == 2){
                this.notify.error('there was an error...');
            }
        })

    }
    
    createSnippetGroup(newSnippetGroup){
                //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/createSnippetGroup',JSON.stringify(newSnippetGroup),options);
        
    }
    editSnippetGroup(sGroup){
        
                //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/saveSnippetGroup',JSON.stringify(sGroup),options).do(res => {
            if (res.status == 200){
                this.notify.success('Modified Succesfully');
            }
            else if (res.status == 1){
                this.notify.error('Cannot find entity in the DB');
            }
            else if (res.status == 2){
                this.notify.error('there was an error...');
            }
        })
        
    }
    loadSnippetGroupList(){
        return this.http.get('/api/getSnippetGroupList');//.map(resp => resp.json());
    }
    loadSnippetGroup(snippetId){
        
                 let params: URLSearchParams = new URLSearchParams();
         params.set('snippetId', snippetId);
        
        
        return this.http.get('/api/getSnippetGroup',{search: params}).do(res => {
            if (res.status == 1){
                this.notify.error('Cannot find entity in the DB');
            }
            else if (res.status == 2) {
                this.notify.error('there was an error...');
            }
        });//.map(resp => resp.json());
        
        
    }
    


}