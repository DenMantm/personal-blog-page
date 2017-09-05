import { Injectable, Inject } from '@angular/core';
import {JQUERY_TOKEN} from './jQuery.service';


@Injectable()
export class VariableStorageService{

constructor(@Inject(JQUERY_TOKEN) private $){
}

}