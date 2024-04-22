import {AfterViewInit, Component,OnDestroy,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_ROUTE, StartRouteCookie } from 'src/app/core/data/cookie/start-cookie.interface';
import { Ruta } from 'src/app/core/data/ruta.interface';
import { StickButtonCommunicationService } from 'src/app/shared/services/stick-button.service';
import { MapaRutaComponent } from '../detalle-rutas/mapa-ruta/mapa-ruta.component';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';
import GoogleMapService from 'src/app/core/services/google/google-map.service';

@Component({
  selector: 'app-start-rutas',
  templateUrl: './start-rutas.component.html',
  styleUrls: ['./start-rutas.component.css']
})
export class StartRutasComponent implements AfterViewInit, OnDestroy{
unidadDistancia: string="km";

  public hasCompleteUserToShowModal: boolean = false;
  public modalSwitch: boolean = false;
  private iniciada: boolean;
  public ruta!: Ruta | null;
  @ViewChild(MapaRutaComponent) mapaRutaComponent!: MapaRutaComponent; 
  tiempoEstimado: number = -1;
  distanciaRestante: number=-1;
  intervalo: any;
  tiempoTranscurrido: number = -1;

  constructor(private readonly router: Router, 
    private readonly serviceCookie: CookieService, 
    private readonly stickButtonCommunicationService: StickButtonCommunicationService,
    private readonly navbarService: NavbarCommunicationService,
  private readonly googleMapsService: GoogleMapService) { 
    this.navbarService.setActiveSearch(false);
    this.iniciada=false;
    if (!this.serviceCookie.check(COOKIE_ROUTE)) 
      this.router.navigate(['/']);

    const data: StartRouteCookie = JSON.parse(this.serviceCookie.get(COOKIE_ROUTE));
    if (data.ruta === null) 
      this.router.navigate(['/']);
    else {
    this.stickButtonCommunicationService.setActiveSticky(false);
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
  ngOnDestroy(): void {
   clearInterval(this.intervalo); 
  }


  ngAfterViewInit(): void {
    if (this.mapaRutaComponent && !this.iniciada){
      this.iniciada = true;
      this.mapaRutaComponent.iniciarRuta();
      this.timer();
      let actualizar=()=>{
       
        if(!this.googleMapsService.terminado){
          this.tiempoEstimado = this.googleMapsService.tiempoEstimado;
          if (this.unidadDistancia === 'km') {
            // Convertir distancia de kilómetros a metros si la unidad actual es km
            this.distanciaRestante = this.googleMapsService.distanciaEstimada ;
          } else {
            // Convertir distancia de metros a kilómetros si la unidad actual es metros
            this.distanciaRestante = this.googleMapsService.distanciaEstimada * 1000;
          } 
          setTimeout(actualizar,1000)
        }
        
      };
      actualizar();
    }
  }
  
  calcularDuracion(duracionTotal: number): string {
    const horas = Math.floor(duracionTotal / 60);
    const minutos = Math.floor(duracionTotal % 60);
    const segundos = Math.floor((duracionTotal - (horas * 60 + minutos)) * 60);
  
    const horasStr = horas < 10 ? '0' + horas : horas.toString();
    const minutosStr = minutos < 10 ? '0' + minutos : minutos.toString();
    const segundosStr = segundos < 10 ? '0' + segundos : segundos.toString();
  
    if (horas === 0) {
      return `${minutosStr}:${segundosStr}`;
    } else {
      return `${horasStr}:${minutosStr}:${segundosStr}`;
    }
  }

  formatoTiempo(segundos: number): string {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
  
    let tiempoFormateado = '';
  
    if (horas > 0) {
      tiempoFormateado += horas.toString().padStart(2, '0') + ':';
    }
  
    tiempoFormateado += minutos.toString().padStart(2, '0') + ':';
    tiempoFormateado += segundosRestantes.toString().padStart(2, '0');
  
    return tiempoFormateado;
  }

  finalizar(hasPressedBtnModalEndRoute?: boolean) : void{
    if (this.mapaRutaComponent || (hasPressedBtnModalEndRoute != null && hasPressedBtnModalEndRoute) ){
      this.mapaRutaComponent.finalizar();
      this.stickButtonCommunicationService.setActiveSticky(false);
      this.serviceCookie.delete(COOKIE_ROUTE);
      this.iniciada = false;
      if(this.ruta)
        this.router.navigate(['ruta/' + this.ruta!.id]);
    }
  }

  handleActiveBtnModalSuccess(hasCompleteRouteUser: boolean): void {
    this.hasCompleteUserToShowModal = hasCompleteRouteUser;
  }

  back() : void {
    if(this.ruta)
      this.router.navigate(['ruta/' + this.ruta!.id]);
  }

  centrar() {
    this.mapaRutaComponent["googleMapService"].centrar();
  }

  timer(): void {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;
        this.tiempoTranscurrido = contador;
      }, 1000); // Intervalo de 1 segundo
    }
    toggleUnidadDistancia() {
      if (this.unidadDistancia === 'km') {
        // Convertir distancia de kilómetros a metros si la unidad actual es km
        this.distanciaRestante = this.distanciaRestante * 1000;
        this.unidadDistancia = 'm';
      } else {
        // Convertir distancia de metros a kilómetros si la unidad actual es metros
        this.distanciaRestante = this.distanciaRestante / 1000;
        this.unidadDistancia = 'km';
      }
    }
}
