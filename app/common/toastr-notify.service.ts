import { Injectable,Inject } from '@angular/core';
import {JQUERY_TOKEN} from './jQuery.service';

declare var toastr;
@Injectable()
export class ToastrNotifyService{

constructor(@Inject(JQUERY_TOKEN) private $){
}

success(text){
    toastr.success(text)
}
warning(text){
    toastr.warning(text);
}
error(text){
    toastr.error(text);
}
info(text){
    toastr.info(text);
}


}
