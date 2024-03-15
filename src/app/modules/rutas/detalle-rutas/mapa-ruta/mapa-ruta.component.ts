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
  map!: google.maps.Map;
  startPoint: google.maps.LatLngLiteral = { lat: 51.233334, lng: 6.78333 }; // Punto de inicio (latitud y longitud)
  endPoint: google.maps.LatLngLiteral = { lat: 51.3, lng: 6.9 }; // Punto de fin (latitud y longitud)
  routeCoordinates: google.maps.LatLngLiteral[] = []; // Coordenadas de la ruta
  

  ngOnInit(): void {
    this.googleMapService.initMap();
  }
}
