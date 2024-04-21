import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ruta } from 'src/app/core/data/ruta.interface';
import GoogleMapService from 'src/app/core/services/google/google-map.service';

@Component({
  selector: 'app-mapa-ruta',
  templateUrl: './mapa-ruta.component.html',
  styleUrls: ['./mapa-ruta.component.css']
})
export class MapaRutaComponent implements OnInit, OnDestroy {
  title = 'google-maps';
  private subscriptionServiceEmitter: Subscription;
  @Output() private hasCompleteRouteUser: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Input() rutaFromParent!: Ruta;

  constructor(private googleMapService: GoogleMapService) {
    this.subscriptionServiceEmitter = this.googleMapService.userEndRouteEmmiter().subscribe((end: boolean) => {
        this.hasCompleteRouteUser.emit(end);
    });
  }
  
  ngOnInit(): void {
    this.googleMapService.initMap(this.rutaFromParent);
  }

  iniciarRuta(): void {
    this.googleMapService.iniciarRuta(this.rutaFromParent);
  }
  finalizar():void{
    this.googleMapService.finalizar();
  }

  ngOnDestroy(): void {
    this.googleMapService.destroyEndRouteEmitter(); //Destruimos el emmiter, para que vuelva a empezar de cero
    this.subscriptionServiceEmitter.unsubscribe();
  }



}
