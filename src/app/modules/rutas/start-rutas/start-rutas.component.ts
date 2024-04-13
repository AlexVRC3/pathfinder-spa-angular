import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_ROUTE, StartRouteCookie } from 'src/app/core/data/cookie/start-cookie.interface';
import { Ruta } from 'src/app/core/data/ruta.interface';
import { SwitchService } from 'src/app/core/services/modal/switch.service';
import { StickButtonCommunicationService } from 'src/app/shared/services/stick-button.service';

@Component({
  selector: 'app-start-rutas',
  templateUrl: './start-rutas.component.html',
  styleUrls: ['./start-rutas.component.css']
})
export class StartRutasComponent {
  public modalSwitch: boolean = false;
  public ruta: Ruta | null;

  constructor( private readonly router: Router, private readonly serviceCookie: CookieService, private readonly stickButtonCommunicationService: StickButtonCommunicationService) { 
    if (!this.serviceCookie.check(COOKIE_ROUTE)) 
      this.router.navigate(['/']);

    const data: StartRouteCookie = JSON.parse(this.serviceCookie.get(COOKIE_ROUTE));
    if (data.ruta === null) 
      this.router.navigate(['/']);

    this.stickButtonCommunicationService.setActiveSticky(true);
    this.ruta = { id: data.ruta!.id, 
                 name: data.ruta!.name,
                 ubicacion: data.ruta!.ubicacion,
                 origenLatitud: data.ruta!.origenLatitud,
                 origenLongitud: data.ruta!.origenLongitud,
                 destinoLatitud: data.ruta!.destinoLatitud,
                 destinoLongitud: data.ruta!.destinoLongitud,
                 image: '',
                 distanciaTotal: 0,
                 duracionTotal: 0
                };
  }
 
}
