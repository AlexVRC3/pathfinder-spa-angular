import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { COOKIE_ROUTE, StartRouteCookie } from 'src/app/core/data/cookie/start-cookie.interface';
import { Ruta } from 'src/app/core/data/ruta.interface';
import { RouteService } from 'src/app/core/services/route/route.services';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';
import { StickButtonCommunicationService } from 'src/app/shared/services/stick-button.service';
@Component({
  selector: 'app-list-rutas',
  templateUrl: './list-rutas.component.html',
  styleUrls: ['./list-rutas.component.css']
})
export class ListRutasComponent implements OnDestroy {
  private suscriptionNavBarService: Subscription;
  public foundRuta: boolean = true;
  public listRutas: Ruta[] = [];
  private cookie: StartRouteCookie;
  constructor(private readonly navBarServices: NavbarCommunicationService, private readonly cookieService: CookieService, private readonly rutaService: RouteService, private readonly stickButtonCommunicationService: StickButtonCommunicationService) { 
    
    if(this.cookieService.check(COOKIE_ROUTE))  this.cookie = JSON.parse(this.cookieService.get(COOKIE_ROUTE));
    else this.cookie = { ruta : null, init: false };
    
    if (this.cookie.init) 
      this.stickButtonCommunicationService.setActiveSticky(true);

    this.navBarServices.setActiveSearch(true);
    this.suscriptionNavBarService = this.navBarServices.$data().pipe(
      switchMap((input: string) => {
        return this.rutaService.getListRoute(input);
      })
    ).subscribe((data: Ruta[]) => {
      this.listRutas = data;
      this.foundRuta = this.listRutas.length > 0;
    });
  }
  
  ngOnDestroy(): void {
    this.suscriptionNavBarService.unsubscribe();
  }
}
