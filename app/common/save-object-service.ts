import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

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
    //it does this automatically...
    // convertString(string){
    //     let tmp = string.replace(/"/g, '\\"');
    //         tmp = tmp.replace(/'/g, "\\'");
    //         tmp = tmp.replace(/`/g, '\\`');
    //         return tmp;
    // }

}