import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { COOKIE_ROUTE, RutaCookie, StartRouteCookie } from 'src/app/core/data/cookie/start-cookie.interface';
import { Ruta } from 'src/app/core/data/ruta.interface';
import { SwitchService } from 'src/app/core/services/modal/switch.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent{
  public nameRutaCookie: string = '';
  @Input() public ruta!: Ruta;
  constructor(private modalService: SwitchService, private readonly cookieService: CookieService, private readonly router: Router) {
    this.nameRutaCookie = (JSON.parse(cookieService.get(COOKIE_ROUTE)) as StartRouteCookie).ruta!.name;
  }

  public closeModal(){
    this.modalService.$modal.emit(false);
  } 

  public acceptRoute(){
      const { id, name, ubicacion, origenLatitud, origenLongitud, destinoLatitud, destinoLongitud } = this.ruta;
      const buildRutaCookie: RutaCookie = { id, name, ubicacion, origenLatitud, origenLongitud, destinoLatitud, destinoLongitud };
      const start: StartRouteCookie = { ruta: buildRutaCookie, init: true };
      this.cookieService.delete(COOKIE_ROUTE);
      this.cookieService.set(COOKIE_ROUTE, JSON.stringify(start));
      this.router.navigate(['/ruta/start']);
  }
}
