import { Component, OnInit } from '@angular/core';
import GoogleMapService from 'src/app/core/services/google/google-map.service';

@Component({
  selector: 'app-mapa-ruta',
  templateUrl: './mapa-ruta.component.html',
  styleUrls: ['./mapa-ruta.component.css']
})
export class MapaRutaComponent implements OnInit {
  title = 'google-maps';
  constructor(private googleMapService: GoogleMapService) { }
  
  ngOnInit(): void {
    this.googleMapService.initMap();
  }
}
