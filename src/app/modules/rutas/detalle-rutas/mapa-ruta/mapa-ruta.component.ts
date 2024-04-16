import { Component, Input, OnInit } from '@angular/core';
import { Ruta } from 'src/app/core/data/ruta.interface';
import GoogleMapService from 'src/app/core/services/google/google-map.service';

@Component({
  selector: 'app-mapa-ruta',
  templateUrl: './mapa-ruta.component.html',
  styleUrls: ['./mapa-ruta.component.css']
})
export class MapaRutaComponent implements OnInit {
  title = 'google-maps';

  @Input()
  rutaFromParent!: Ruta;
  constructor(private googleMapService: GoogleMapService) { 
   
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

}
