import {Component, ViewChild, ElementRef, AfterViewInit,OnInit, Inject} from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ActivatedRoute } from '@angular/router';
import { JQUERY_TOKEN } from '../common/index';


@Component({
    templateUrl:'./app/home/home.component.html',
		styles:[`h1 {color:red;}`]
})


export class HomeComponent implements OnInit {
		ngOnInit(): void {
			this.user = this.route.snapshot.data['user'];
		}
	user:any;
	constructor(
	private route:ActivatedRoute,	
	private auth:AuthService,
	@Inject(JQUERY_TOKEN) private $){
	}
  ngAfterViewInit() {
    
  }
	ngOnChanges(){
		this.user = this.auth.getCurrentUser();
	}


}