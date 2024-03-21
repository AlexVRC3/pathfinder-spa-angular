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

  it('should create', () => {
    fixture = TestBed.createComponent(MapaRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

 
  
      // Initializes the component with a valid input 'rutaFromParent' and calls 'initMap' method of 'GoogleMapService'
  it('should initialize component with valid input and call initMap method', () => {
        const fixture = TestBed.createComponent(MapaRutaComponent);
        const component = fixture.componentInstance;
        component.rutaFromParent = {
          id: 1,
          name: 'Test Ruta',
          ubicacion: 'Test Ubicacion',
          origenLatitud: 40.6057,
          origenLongitud: -4.17309,
          destinoLatitud: 40.5999,
          destinoLongitud: -4.15293
        };
        const unsubscribeSpy = spyOn(component['googleMapService'], 'initMap');
        component.ngOnInit();
        fixture.detectChanges();
  
        expect(unsubscribeSpy).toHaveBeenCalledWith(component.rutaFromParent);
  });

  it('should initialize map successfully', (done) => {
    const servicio = new GoogleMapService();
    const ruta: Ruta = {
      // Define los valores de la ruta según sea necesario
      id: 1,
          name: 'Test Ruta',
          ubicacion: 'Test Ubicacion',
          origenLatitud: 40.6057,
          origenLongitud: -4.17309,
          destinoLatitud: 40.5999,
          destinoLongitud: -4.15293
    };
    servicio.initMap(ruta);
  
    // Espera un tiempo suficiente para que se cargue el mapa
    setTimeout(() => {
      expect(servicio.map).toBeDefined();
      done();
    }, 2000); // Ajusta el tiempo de espera según sea necesario
  });
  
  
});
