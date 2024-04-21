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
  

});
