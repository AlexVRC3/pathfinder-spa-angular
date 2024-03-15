import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Injectable({
  providedIn: 'root'
})
export default class GoogleMapService {
  
  map!: google.maps.Map;
  startPoint: google.maps.LatLngLiteral = { lat: 51.233334, lng: 6.78333 }; // Punto de inicio (latitud y longitud)
  endPoint: google.maps.LatLngLiteral = { lat: 51.3, lng: 6.9 }; // Punto de fin (latitud y longitud)
  routeCoordinates: google.maps.LatLngLiteral[] = []; // Coordenadas de la ruta

  constructor() {}

  initMap(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyC8QdyoZDAq0MLcuCQijg-HIpVtJ3uLCmY'
    })

    loader.load().then(() => {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, {
          center: this.startPoint,
          zoom: 6
        });

        // Dibujar la ruta entre los puntos inicial y final
        this.drawRoute();

      } else {
        console.error("Elemento 'map' no encontrado en el DOM");
      }
    }).catch(error => {
      console.error("Error al cargar la API de Google Maps:", error);
    })
  }
  drawRoute() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      suppressMarkers: true // No mostrar marcadores en la ruta
    });

    const request = {
      origin: this.startPoint,
      destination: this.endPoint,
      travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        // Almacenar las coordenadas de la ruta
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
