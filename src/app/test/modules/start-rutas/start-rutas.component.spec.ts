import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { StartRutasComponent } from '../../../modules/rutas/start-rutas/start-rutas.component';
import { StickButtonCommunicationService } from 'src/app/shared/services/stick-button.service';
import { MapaRutaComponent } from 'src/app/modules/rutas/detalle-rutas/mapa-ruta/mapa-ruta.component';
import GoogleMapService from 'src/app/core/services/google/google-map.service';

describe('StartRutasComponent', () => {
  let component: StartRutasComponent;
  let fixture: ComponentFixture<StartRutasComponent>;
  let cookieService: CookieService;
  let stickButtonService: StickButtonCommunicationService;

  beforeEach(async () => {
    
    let cookieServiceStub = {
      check: () => true,
      get: () => '{"ruta": {"name": "Ruta de ejemplo"}}', // Proporciona un valor válido para la cookie
      delete: () => {},
      set: () => {}
    };

    await TestBed.configureTestingModule({
      declarations: [StartRutasComponent, MapaRutaComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: CookieService, useValue: cookieServiceStub }, StickButtonCommunicationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRutasComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    stickButtonService = TestBed.inject(StickButtonCommunicationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home if cookie route is not found', () => {
    let Service=TestBed.inject(CookieService);    
    spyOn(Service, 'check').and.callFake( (name:string)  => {
      return false;
    });
    const navigateSpy = spyOn(component['router'], 'navigate');

    fixture = TestBed.createComponent(StartRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to home if route data is null', () => {
   let Service=TestBed.inject(CookieService);    
    spyOn(Service, 'get').and.callFake( (name:string)  => {
      return JSON.stringify({ ruta: null });
    });
    
    const navigateSpy = spyOn(component['router'], 'navigate');
    fixture = TestBed.createComponent(StartRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

   expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });


  it('should call iniciarRuta on mapaRutaComponent after view init', () => {
    const iniciarRutaSpy = spyOn(component.mapaRutaComponent, 'iniciarRuta');
    component["iniciada"] = false;
    component.ngAfterViewInit();

    expect(iniciarRutaSpy).toHaveBeenCalled();
  });

  it('should call finalizar on mapaRutaComponent when finalizar is called', () => {
   
    component.ruta = null;
    component.mapaRutaComponent= new MapaRutaComponent(new GoogleMapService());
    const finalizarSpy = spyOn(component.mapaRutaComponent, 'finalizar');
    component.finalizar();

    expect(finalizarSpy).toHaveBeenCalled();
  });

  it('should calculate duration correctly', () => {
    const duration = 75; // Duration in minutes
    const expectedDuration = '01:15:00'; // Expected duration in hh:mm:ss format
    const result = component.calcularDuracion(duration);
    expect(result).toEqual(expectedDuration);
  });

  it('should navigate back to the previous route', () => {
    component.ruta = {
      id: 1,
          name: 'Test Ruta',
          ubicacion: 'Test Ubicacion',
          origenLatitud: 40.6057,
          origenLongitud: -4.17309,
          destinoLatitud: 40.5999,
          destinoLongitud: -4.15293,
          distanciaTotal: 135,
          duracionTotal: 120,
          image: "alguna imagen"}

    spyOn(component['router'], 'navigate');
    component.back();
    expect(component['router'].navigate).toHaveBeenCalledWith(['ruta/' + component.ruta.id]); // Replace '1' with the correct ID
  });

  it('should center the map', () => {
    spyOn(component.mapaRutaComponent['googleMapService'], 'centrar');
    component.centrar();
    expect(component.mapaRutaComponent['googleMapService'].centrar).toHaveBeenCalled();
  });

  it('should format time correctly for 40 seconds', () => {
    const seconds = 40;
    const expectedTime = '00:40'; // Expected time in hh:mm:ss format
    const result = component.formatoTiempo(seconds);
    expect(result).toEqual(expectedTime);
  });
  
  it('should format time correctly for 3800 seconds', () => {
    const seconds = 3800;
    const expectedTime = '01:03:20'; // Expected time in hh:mm:ss format
    const result = component.formatoTiempo(seconds);
    expect(result).toEqual(expectedTime);
  });
  
  it('should format time correctly for 3600 seconds', () => {
    const seconds = 3600;
    const expectedTime = '01:00:00'; // Expected time in hh:mm:ss format
    const result = component.formatoTiempo(seconds);
    expect(result).toEqual(expectedTime);
  });
  
  it('should format time correctly for 65 seconds', () => {
    const seconds = 65;
    const expectedTime = '01:05'; // Expected time in hh:mm:ss format
    const result = component.formatoTiempo(seconds);
    expect(result).toEqual(expectedTime);
  });
  

});
