import { Component, OnDestroy,  } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { COOKIE_ROUTE, StartRouteCookie } from 'src/app/core/data/cookie/start-cookie.interface';
import { Ruta } from 'src/app/core/data/ruta.interface';
import { RouteService } from 'src/app/core/services/route/route.services';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-detalle-rutas',
  templateUrl: './detalle-rutas.component.html',
  styleUrls: ['./detalle-rutas.component.css']
})
export class DetalleRutasComponent implements OnDestroy {
  public ruta: Ruta | null = null; 
  public rutaCompleta: string = '';
  public existRuta: boolean = true;
  public cookie: StartRouteCookie;
  private suscriptionRutaService: Subscription;
  constructor(private readonly route: ActivatedRoute, 
              private readonly rutaService: RouteService, 
              private readonly navbarService: NavbarCommunicationService,
              private readonly cookieService: CookieService) {
    
    const id: number = this.route.snapshot.params['id'];
    this.navbarService.setActiveSearch(false);

    if(this.cookieService.check(COOKIE_ROUTE))  this.cookie = JSON.parse(this.cookieService.get(COOKIE_ROUTE));
    else this.cookie = { nameRoute: '', init: false };
  
    this.suscriptionRutaService = this.rutaService.getRuta(id)
                                              .subscribe((ruta: Ruta) => {
                                                  this.ruta = ruta;
                                                  this.existRuta = this.ruta != null;
                                              });

  }

  ngOnDestroy(): void {
    this.suscriptionRutaService.unsubscribe();
  }
  
  calcularDuracion(duracionTotal: number): string {
    const horas = Math.floor(duracionTotal / 60); 
    const minutos = duracionTotal % 60; 
    const horasStr = horas === 1 ? 'hora' : 'horas';
    const minutosStr = minutos === 1 ? 'minuto' : 'minutos';
    return `${horas} ${horasStr} y ${minutos} ${minutosStr}`;
  }

  startRoute(): void {
    if(this.ruta != null){
      const start: StartRouteCookie = { nameRoute: this.ruta.name, init: true};
      this.cookieService.delete(COOKIE_ROUTE)
      this.cookieService.set(COOKIE_ROUTE, JSON.stringify(start));
      
    }
  }

}

