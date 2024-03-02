import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export default class EnvironmentService {
 private readonly API = environment.URL_API;
 private readonly PATH = environment.PATH; 
 private readonly IS_PRODUCTION = environment.production; 

 constructor(){}

 public getUrl(path ?: string): string {
    let result: string = '';
    if (this.IS_PRODUCTION) 
        result = this.buildEnvPro;
    else
        result = this.buildEnvDev;

    if(path) {
        const buildingPath = this.PATH.CONTEXT.concat(path);
        result = result.concat(buildingPath);
    }
    return result;
 }

 private get buildEnvDev():string {
    return `${this.API.PROTOCOL}${this.API.HOST}:${this.API.PORT}`;
 }

 private get buildEnvPro():string {
    return `${this.API.PROTOCOL}${this.API.HOST}`;
 }; 
 

}