import { Component, OnDestroy, ViewChild,  } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { COOKIE_ROUTE, RutaCookie, StartRouteCookie } from 'src/app/core/data/cookie/start-cookie.interface';
import { Ruta } from 'src/app/core/data/ruta.interface';
import { SwitchService } from 'src/app/core/services/modal/switch.service';
import { RouteService } from 'src/app/core/services/route/route.services';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';
import { StickButtonCommunicationService } from 'src/app/shared/services/stick-button.service';

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
  public showModal: boolean = false;
  private suscriptionRutaService: Subscription;
  private subscriptionSwitch: Subscription;
  constructor(private readonly route: ActivatedRoute, 
              private readonly rutaService: RouteService, 
              private readonly navbarService: NavbarCommunicationService,
              private readonly cookieService: CookieService,
              private readonly modalService: SwitchService,
              private readonly router: Router,
              private readonly stickButtonCommunicationService: StickButtonCommunicationService) {
    
    const id: number = this.route.snapshot.params['id'];
   

    if(this.cookieService.check(COOKIE_ROUTE))  this.cookie = JSON.parse(this.cookieService.get(COOKIE_ROUTE));
    else this.cookie = { ruta : null, init: false };

    this.navbarService.setActiveSearch(false);
    
    if (this.cookie.init) 
        this.stickButtonCommunicationService.setActiveSticky(true);
    
    this.suscriptionRutaService = this.rutaService.getRuta(id)
                                              .subscribe((ruta: Ruta) => {
                                                  this.ruta = ruta;
                                                  this.existRuta = this.ruta != null;
                                              });
    this.subscriptionSwitch = this.modalService.$modal.subscribe((showModal: boolean) => this.showModal = showModal);
  }

  ngOnDestroy(): void {
    this.suscriptionRutaService.unsubscribe();
    this.subscriptionSwitch.unsubscribe();
  }


  calcularDuracion(duracionTotal: number): string {
    const horas = Math.floor(duracionTotal / 60);
    const minutos = Math.round(duracionTotal % 60);
    const horasStr = horas === 1 ? 'hora' : 'horas';
    const minutosStr = minutos === 1 ? 'minuto' : 'minutos';
  
    if (horas === 0) {
      return `${minutos} ${minutosStr}`;
    } else if (minutos === 0) {
      return `${horas} ${horasStr}`;
    } else {
      return `${horas} ${horasStr} y ${minutos} ${minutosStr}`;
    }
  }

  startRoute(): void {
    if(this.cookie.init) this.showModal = true;
    else  {
      if (this.ruta != null) {
        const { id, name, ubicacion, origenLatitud, origenLongitud, destinoLatitud, destinoLongitud } = this.ruta;
        const buildRutaCookie: RutaCookie = { id, name, ubicacion, origenLatitud, origenLongitud, destinoLatitud, destinoLongitud };
        const start: StartRouteCookie = { ruta: buildRutaCookie, init: true };
        this.cookieService.delete(COOKIE_ROUTE);
        this.cookieService.set(COOKIE_ROUTE, JSON.stringify(start));
        this.router.navigate(['/ruta/start']);
      }
    }
  }



}

