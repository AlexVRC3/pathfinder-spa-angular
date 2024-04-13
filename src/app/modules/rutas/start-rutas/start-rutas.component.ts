import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_ROUTE, StartRouteCookie } from 'src/app/core/data/cookie/start-cookie.interface';
import { Ruta } from 'src/app/core/data/ruta.interface';
import { SwitchService } from 'src/app/core/services/modal/switch.service';

@Component({
  selector: 'app-start-rutas',
  templateUrl: './start-rutas.component.html',
  styleUrls: ['./start-rutas.component.css']
})
export class StartRutasComponent implements OnInit {
  modalSwitch: boolean | undefined;
  ruta: Ruta | null;

  constructor( private readonly router: Router, private readonly serviceCookie: CookieService, private modalSS:SwitchService) { 
    if (!this.serviceCookie.check(COOKIE_ROUTE)) 
      this.router.navigate(['/']);

    const data: StartRouteCookie = JSON.parse(this.serviceCookie.get(COOKIE_ROUTE));
    if (data.ruta === null) 
      this.router.navigate(['/']);

    this.ruta = data.ruta;
  }
  ngOnInit() {
    this.modalSS.$modal.subscribe((valor) => {this.modalSwitch = valor})
  }

  openModal(){
    this.modalSwitch = true;
  }

}
