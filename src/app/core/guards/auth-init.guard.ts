import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { COOKIE_ROUTE, StartRouteCookie } from '../data/cookie/start-cookie.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInitGuard implements CanActivate {

  constructor(private readonly cookieService: CookieService, private readonly router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let haveInitRoute: boolean = false;
    if (this.cookieService.check(COOKIE_ROUTE)) {
      let data: StartRouteCookie = JSON.parse(this.cookieService.get(COOKIE_ROUTE));
      haveInitRoute = data.init;
    }
    const obs: Observable<boolean> = of(haveInitRoute);
    return obs.pipe(
      tap(auth => {
        if (!auth) this.router.navigate(['/']);
      })
    );
  }
  
}
