import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Ruta } from '../../data/ruta.interface';

@Injectable({
  providedIn: 'root'
})
export default class GoogleMapService {
  
  map!: google.maps.Map;
  routeCoordinates: google.maps.LatLngLiteral[] = []; 

  constructor() {}

  initMap(ruta: Ruta): void {
    let loader = new Loader({
      apiKey: 'AIzaSyC8QdyoZDAq0MLcuCQijg-HIpVtJ3uLCmY'
    });

    loader.load().then(() => {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, {
          zoom: 12 
        });

        this.drawRoute(ruta);
      } else {
        console.error("Elemento 'map' no encontrado en el DOM");
      }
    }).catch(error => {
      console.error("Error al cargar la API de Google Maps:", error);
    });
  }

  drawRoute(ruta: Ruta) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      suppressMarkers: false
    });

    const request = {
      origin: { lat: ruta.origenLatitud, lng: ruta.origenLongitud },
      destination: { lat: ruta.destinoLatitud, lng: ruta.destinoLongitud },
      travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
       
        if(result != null){
          this.routeCoordinates = result.routes[0].overview_path.map((path: any) => {
            return { lat: path.lat(), lng: path.lng() };
          });
        } else {
          console.error("Error al obtener la ruta:", status);
        }
        }
    });

  }
}
