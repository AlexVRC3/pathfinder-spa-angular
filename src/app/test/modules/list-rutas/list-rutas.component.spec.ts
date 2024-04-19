
import { HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { CookieService } from "ngx-cookie-service";
import { Observable, of } from "rxjs";
import { Ruta } from "src/app/core/data/ruta.interface";
import EnvironmentService from "src/app/core/services/environment/env.service";
import { RouteService } from "src/app/core/services/route/route.services";
import { ListRutasComponent } from "src/app/modules/rutas/list-rutas/list-rutas.component";
import { RutasModule } from "src/app/modules/rutas/rutas.module";
import { LoaderComponent } from "src/app/shared/components/loader/loader.component";
import { NavbarCommunicationService } from "src/app/shared/services/navbar.service";
import { StickButtonCommunicationService } from "src/app/shared/services/stick-button.service";
import { environment } from "src/environments/environment";


describe('ListRutasComponent', () => {
    const navbarCommunicationServiceSpy: jasmine.SpyObj<NavbarCommunicationService> = jasmine.createSpyObj('navBarServices', ['setData', '$data']);
    const routeServiceSpy: jasmine.SpyObj<RouteService> = jasmine.createSpyObj('rutaService', [ 'getListRoute' ]);
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            RutasModule,
            HttpClientModule
        ],
        declarations: [LoaderComponent],
        providers: [
            { provide: NavbarCommunicationService, useVale: navbarCommunicationServiceSpy },
            { provide: RouteService, useVale: routeServiceSpy }
        ]
      }).compileComponents();
    });
                   
    it('should create', () => {
      const fixture = TestBed.createComponent(ListRutasComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    
    it('should have a variable called foundRuta with value true as a default', () => {
      const fixture = TestBed.createComponent(ListRutasComponent);
      const component = fixture.componentInstance;
      expect(component.foundRuta).toBeTruthy();
      expect(component.foundRuta).toEqual(true);
    });

    it('should have a variable called listRutas with value [] as a default', () => {
      const fixture = TestBed.createComponent(ListRutasComponent);
      const component = fixture.componentInstance;
      expect(component.listRutas).toBeTruthy();
      expect(component.listRutas).toEqual([]);
    });
    
    it('should unsubscribe from subscriptions onDestroy', () => {
      const fixture = TestBed.createComponent(ListRutasComponent);
      const component = fixture.componentInstance;

      const unsubscribeSpy = spyOn(component['suscriptionNavBarService'], 'unsubscribe');
   
      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
    

});

describe('RouteService', () => {
  let routeService: RouteService;
  let httpMock: jasmine.SpyObj<HttpClient>;
  let envServiceMock: jasmine.SpyObj<EnvironmentService>;
  let cookieService: CookieService;

  beforeEach(() => {
    httpMock = jasmine.createSpyObj('HttpClient', ['get']);
    envServiceMock = jasmine.createSpyObj('EnvironmentService', ['getUrl']);
    
    TestBed.configureTestingModule({
      providers: [
        RouteService, CookieService, StickButtonCommunicationService, NavbarCommunicationService,
        { provide: HttpClient, useValue: httpMock },
        { provide: EnvironmentService, useValue: envServiceMock }
      ]
    });
    routeService = TestBed.inject(RouteService);
  });

  it('should call http.get with correct parameters', () => {
    const ubicacion = 'some_location';
    const mockRutas: Ruta[] = []; 
    
    const mockUrl = 'mocked_url';
    envServiceMock.getUrl.and.returnValue(mockUrl);

    const mockResponse: Observable<Ruta[]> = of(mockRutas);
    httpMock.get.and.returnValue(mockResponse);

    routeService.getListRoute(ubicacion).subscribe((response) => {
      expect(response).toEqual(mockRutas); 
    });

    expect(httpMock.get).toHaveBeenCalledWith(mockUrl, { params: jasmine.any(HttpParams) }); 
    expect(envServiceMock.getUrl).toHaveBeenCalledWith(environment.PATH.RUTA.SEARCH); 
  });

  it('should set cookie to null if check is false', () => {
    const fixture = TestBed.createComponent(ListRutasComponent);
    const component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    
    spyOn(component['cookieService'], 'check').and.returnValue(false);

    new ListRutasComponent(new NavbarCommunicationService(), cookieService, routeService, component['stickButtonCommunicationService']);
    component["cookie"].ruta = null;
    component["cookie"].init = false;
    expect(component["cookie"].ruta).toBeNull();
    expect(component["cookie"].init).toBeFalse();
});


});



