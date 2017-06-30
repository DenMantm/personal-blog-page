import { Component, Inject, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { JQUERY_TOKEN } from '../common/index';
import { AuthService } from '../user/auth.service';
import { IUser } from '../user/user.model';

@Component({
    selector: 'navbar-component',
    templateUrl: 'app/nav/navbar.component.html'
    //     styles: [`.nav.navbar-nav {font-size:15px;}
    // #searchForm {margin-right: 100px;}
    // @media (max-width:1200px){#searchForm {display:none} }
    // li > a.active{color:red;}`]
})

export class NavbarComponent {
    private el:HTMLElement
    colors:string[] = [];
    navbarColors:Object[] = [];
    @ViewChild('charm') charm:ElementRef;
    @Output() changeScheme = new EventEmitter();
    currentUser:IUser;
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
         
    }
    ngOnInit(){
        this.el = this.charm.nativeElement;
        let tmp:string;
        for(let i =0;i<20;i++){
            tmp = this.getRandomColor();
            this.colors.push(tmp);
        }
        //getting current user
       this.currentUser = this.auth.getCurrentUser();
       console.log(this.currentUser);

       //colours for navbar
       this.navbarColors = [{class:'darcula',
                             color:'#3c3f41'},
                             {class:'pink',
                             color:'#dc4fad'},
                             {class:'navy',
                             color:'#0072c6'},
                             {class:'red',
                             color:'#ce352c'},
                             {class:'green',
                             color:'#60a917'},
                             {class:'orange',
                             color:'#fa6800'},
                             {class:'default',
                             color:'#0072c6'}]

                            
        //this.currentUser.appSettings.navbarColourScheme = this.navbarColors[0];
    }
        ngAfterViewInit() {
                  this.changeColour(this.currentUser.appSettings.colourScheme);
                    this.changeNavbarColour(this.currentUser.appSettings.navbarColourScheme);
        }
    
    showColourScheme(){
           var  charm = this.$(this.el).data("charm");
            if (charm.element.data("opened") === true) {
                charm.close();
            } else {
                charm.open();
            }
    }
    changeColour(color){
        
        this.changeScheme.emit(color);
        this.currentUser.appSettings.colourScheme = color;

         this.auth.changeUserSettings(this.currentUser).subscribe();
    }
    changeNavbarColour(color){
            this.currentUser.appSettings.navbarColourScheme = color;

            this.auth.changeUserSettings(this.currentUser).subscribe();
    }

    getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;   
  } 
  logout(){
    this.auth.logout();
  }
  showSettings(){
      this.$('#settings').modal();
  }


}