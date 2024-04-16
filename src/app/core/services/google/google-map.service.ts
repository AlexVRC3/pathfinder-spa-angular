import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Ruta } from '../../data/ruta.interface';

@Injectable({
  providedIn: 'root'
})
export default class GoogleMapService {
  
  map: google.maps.Map;
  routeCoordinates: google.maps.LatLngLiteral[] = []; 
  userMarker: google.maps.Marker | null = null; 
  loader!: Loader;
  terminado:boolean = false;
  startLocation!: google.maps.LatLng;

  constructor() {
    this.map = {} as google.maps.Map;
  }

  initMap(ruta: Ruta): void {
     this.loader = new Loader({
      apiKey: 'AIzaSyC8QdyoZDAq0MLcuCQijg-HIpVtJ3uLCmY'
    });

    this.loader.load().then(() => {
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
          this.startLocation = result.routes[0].legs[0].start_location;
          if(result.routes[0].legs[0].distance)
            ruta.distanciaTotal = result.routes[0].legs[0].distance.value /1000;
          if(result.routes[0].legs[0].duration)
            ruta.duracionTotal = result.routes[0].legs[0].duration.value / 60;
          this.routeCoordinates = result.routes[0].overview_path.map((path: any) => {
            return { lat: path.lat(), lng: path.lng() };
          });
        } else {
          console.error("Error al obtener la ruta:", status);
        }
        }
    });

  }

  iniciarRuta(ruta: Ruta) {
    console.log("voy a hacer un marcador");
    this.terminado=false;
    if(this.userMarker!=null){
      this.userMarker?.setIcon({
        url: 'assets/images/ubi-usuario.png',
        scaledSize: new google.maps.Size(20, 20)
        });
    }
    if(this.userMarker==null){
      this.loader.load().then(() => {
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
        let position: google.maps.LatLngLiteral = {lat: this.startLocation.lat(), lng: this.startLocation.lng()};
        this.map.setZoom(15); 
        this.initUserMarker(position);
        this.simulateMovementAlongRoute(this.routeCoordinates, 1000); 
        });
    });
    }
    
  }
  
  initUserMarker(currentPos: google.maps.LatLngLiteral) {
    if(this.userMarker!=null){
      this.userMarker.setMap(null);
      this.userMarker=null;
    }
    this.userMarker = new google.maps.Marker({
      position: currentPos,
      map: this.map,
      title: 'Posición actual',
      icon: {
        url: 'assets/images/ubi-usuario.png',
        scaledSize: new google.maps.Size(20, 20)
      }
    });
  }

  simulateMovementAlongRoute(routeCoordinates: google.maps.LatLngLiteral[], interval: number) {
  let index = 0;
  let previousUserPositions : google.maps.LatLngLiteral[] = []; 
  const moveMarker = async () => {
    if (index < routeCoordinates.length && !this.terminado) {
      const newPosition = routeCoordinates[index];
      //const newPosition = await this.posicionActual();
      previousUserPositions.push(newPosition);
      this.initUserMarker(newPosition);
      this.drawUserPath(previousUserPositions);
      index++;
      setTimeout(moveMarker, interval);
    }
  };
  moveMarker();
}
drawUserPath(previousUserPositions: google.maps.LatLngLiteral[]) {
  if (previousUserPositions.length > 1) {
    const path = new google.maps.Polyline({
      path: previousUserPositions,
      geodesic: true,
      strokeColor: "red",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    path.setMap(this.map);
  }
}
updateUserMarker(position: google.maps.LatLngLiteral) {
    if (this.userMarker) {
      this.userMarker.setPosition(position);
    }
}
posicionActual(): Promise<google.maps.LatLngLiteral> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        const currentPos: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(currentPos);
      },
      (error: GeolocationPositionError) => {
        reject(error);
      }
    );
  });
}

finalizar():void{
  this.terminado=true;
  this.userMarker=null;
}
}
