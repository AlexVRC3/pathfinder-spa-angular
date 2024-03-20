import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaRutaComponent } from '../../../../modules/rutas/detalle-rutas/mapa-ruta/mapa-ruta.component';
import GoogleMapService from 'src/app/core/services/google/google-map.service';
import { Ruta } from 'src/app/core/data/ruta.interface';

describe('MapaRutaComponent', () => {
  let component: MapaRutaComponent;
  let fixture: ComponentFixture<MapaRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaRutaComponent ],
      providers: [GoogleMapService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('Map service should initialize map and draw route successfully', () => {
    // Arrange
    const googleMapService = TestBed.inject(GoogleMapService);
    const ruta: Ruta = {
      id: 1,
      name: 'Test Route',
      ubicacion: 'Test Location',
      origenLatitud: 0,
      origenLongitud: 0,
      destinoLatitud: 1,
      destinoLongitud: 1
    };

    // Act
    googleMapService.initMap(ruta);

    // Assert
    expect(googleMapService.map).toBeDefined();
    expect(googleMapService.routeCoordinates.length).toBeGreaterThan(0);
  });*/
  
      // Initializes the component with a valid input 'rutaFromParent' and calls 'initMap' method of 'GoogleMapService'
  it('should initialize component with valid input and call initMap method', () => {
        const fixture = TestBed.createComponent(MapaRutaComponent);
        const component = fixture.componentInstance;
        component.rutaFromParent = {
          id: 1,
          name: 'Test Ruta',
          ubicacion: 'Test Ubicacion',
          origenLatitud: 0,
          origenLongitud: 0,
          destinoLatitud: 0,
          destinoLongitud: 0
        };
        const unsubscribeSpy = spyOn(component['googleMapService'], 'initMap');
        component.ngOnInit();
        fixture.detectChanges();
  
        expect(unsubscribeSpy).toHaveBeenCalledWith(component.rutaFromParent);
  });

    

});
