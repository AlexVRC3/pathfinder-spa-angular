import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Ruta } from '../../data/ruta.interface';

@Injectable({
  providedIn: 'root'
})
export default class GoogleMapService {
  
  map: google.maps.Map;
  //ruta real
  routeCoordinates: google.maps.LatLngLiteral[] = []; 
  startLocation!: google.maps.LatLng;
  // camino hasta el inicio de la ruta
  routeCoordinatesToRoute: google.maps.LatLngLiteral[] = []; 
  startLocationToRoute!: google.maps.LatLng;
  userMarker: google.maps.Marker | null = null; 
  loader!: Loader;
  terminado:boolean = true;
  
  id: number=-1;
  pos: google.maps.LatLngLiteral| null=null;
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
        this.posicionActual().then((posicion: google.maps.LatLngLiteral) => {
         
          this.pos=posicion;
          this.drawRoute(ruta);
          if(this.userMarker!=null){
            
            this.userMarker.setMap(this.map);
            this.userMarker.setPosition(posicion)
            if(!this.ubicacionEnRango(posicion,this.routeCoordinates[0],10))
              this.drawRouteToInitPoint(posicion,this.routeCoordinates[0]);        
          }
      });
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
    let newPosition: google.maps.LatLngLiteral; // Define newPosition fuera de la función
    this.terminado=false;
    this.loader.load().then(() => {
     this.posicionActual().then((posicion: google.maps.LatLngLiteral) => {
        newPosition = posicion;
          // Hacer cualquier otra cosa con la nueva posición aquí, ya que newPosition está definida dentro del mismo ámbito
        
       if(!this.ubicacionEnRango(newPosition,this.routeCoordinates[0],10)){
         this.drawRouteToInitPoint(this.pos!,this.routeCoordinates[0]);
          console.log("ubicacion no está en rango");
       }
       //this.map.setZoom(15);                  
       google.maps.event.addListenerOnce(this.map, 'idle', () => {
        if(this.userMarker!=null){
            this.map.setCenter(newPosition);
            this.userMarker!.setIcon({
            url: 'assets/images/ubi-usuario.png',
            scaledSize: new google.maps.Size(20, 20)
            });
        }
        else{
            //let position: google.maps.LatLngLiteral = {lat: this.startLocation.lat(), lng: this.startLocation.lng()};
            this.initUserMarker(this.pos!);
            this.map.setCenter(this.pos!);
            this.simulateMovementAlongRoute(this.routeCoordinates, 2000); 

        }
      });
    });
});
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
    if (  !this.terminado) {
      //const newPosition = routeCoordinates[index];
      const newPosition = await this.posicionActual();
      previousUserPositions.push(newPosition);
      this.initUserMarker(newPosition);
      this.drawUserPath(previousUserPositions);
      index++;
      if(!this.ubicacionEnRango(newPosition,routeCoordinates[routeCoordinates.length-1],10)){
        setTimeout(moveMarker, interval);
        
      }
      else{
        // Logica del modal
        this.terminado = true;
      }
        
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
    navigator.geolocation.getCurrentPosition(
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

// Calcular la distancia entre dos puntos geográficos utilizando la fórmula del haversine
calcularDistancia(punto1: google.maps.LatLngLiteral, punto2: google.maps.LatLngLiteral): number {
  const radioTierra = 6371e3; // Radio medio de la Tierra en metros
  const lat1 = punto1.lat * Math.PI / 180; // Convertir latitud a radianes
  const lat2 = punto2.lat * Math.PI / 180;
  const deltaLat = (punto2.lat - punto1.lat) * Math.PI / 180;
  const deltaLng = (punto2.lng - punto1.lng) * Math.PI / 180;

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radioTierra * c; // Distancia en metros
}


// Verificar si la ubicación del usuario está dentro del rango de finalización
 ubicacionEnRango(ubicacionUsuario: google.maps.LatLngLiteral, destinoFinal: google.maps.LatLngLiteral, rango: number): boolean {
  const distancia = this.calcularDistancia(ubicacionUsuario, destinoFinal);
  return distancia <= rango;
}

drawRouteToInitPoint(ubicacionUsuario: google.maps.LatLngLiteral, puntoInicial: google.maps.LatLngLiteral){
  
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: this.map,
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#ff0000', // Cambia el color de la línea a rojo
      strokeOpacity: 0.7, // Opacidad similar a la del DirectionsRenderer por defecto
      strokeWeight: 6, // Grosor similar al del DirectionsRenderer por defecto
      geodesic: true // Seguir curvas de la Tierra como en el DirectionsRenderer por defecto
    }
  });

  const request = {
    origin: { lat: ubicacionUsuario.lat, lng: ubicacionUsuario.lng },
    destination: { lat: puntoInicial.lat, lng: puntoInicial.lng },
    travelMode: google.maps.TravelMode.WALKING
  };

  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
      
      if(result != null){
        this.startLocationToRoute = result.routes[0].legs[0].start_location;
        this.routeCoordinatesToRoute = result.routes[0].overview_path.map((path: any) => {
          return { lat: path.lat(), lng: path.lng() };
        });
      } else {
        console.error("Error al obtener la ruta:", status);
      }
      }
  });
}

}



