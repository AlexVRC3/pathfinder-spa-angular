import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderCommunicationService } from 'src/app/shared/services/loader.service';
import { finalize } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
 
    constructor(private readonly loaderService: LoaderCommunicationService){}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.showLoader();
        return next.handle(req).pipe(
            finalize(() => this.loaderService.hideLoader())
        );
    }

 
}
