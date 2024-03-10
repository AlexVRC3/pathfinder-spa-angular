
import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { RouteService } from "src/app/core/services/route/route.services";
import { ListRutasComponent } from "src/app/modules/rutas/list-rutas/list-rutas.component";
import { RutasModule } from "src/app/modules/rutas/rutas.module";
import { of } from 'rxjs';
import { LoaderComponent } from "src/app/shared/components/loader/loader.component";
import { NavbarCommunicationService } from "src/app/shared/services/navbar.service";
import { Ruta } from "src/app/core/data/ruta.interface";


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

   /* it('should set foundRuta to false when subscription returns empty data', () => {
      const fixture = TestBed.createComponent(ListRutasComponent);
     
      // Simula el servicio de ruta para devolver una lista vacía
      routeServiceSpy.getListRoute.and.returnValue(of([]));
      const component = fixture.componentInstance;
      // Simula el servicio de comunicación del navbar para devolver datos vacíos
      navbarCommunicationServiceSpy.setData(" ");
      
      fixture.detectChanges();
  
      
      expect(component.foundRuta).toBeFalse();
      expect(component.listRutas).toEqual([]);
    });
    it('shoud set foundUser to true and listRutas with data when subscription returns data', () => {
      
      const fixture = TestBed.createComponent(ListRutasComponent);
      const component = fixture.componentInstance;

      const mockRutas: Ruta[] = [
        { id: 1, name: 'Ruta 1', ubicacion: 'Ubicación 1' },
        { id: 2, name: 'Ruta 2', ubicacion: 'Ubicación 2' }
      ];

      const newData = "New input data";
      navbarCommunicationServiceSpy.setData(newData);
     
      routeServiceSpy.getListRoute.and.returnValue(of(mockRutas));

      fixture.detectChanges();//TODO: MIRAR
 
      expect(component.foundRuta).toBeTrue();
      expect(component.listRutas).toEqual(mockRutas);
    });*/
    it('should unsubscribe from subscriptions onDestroy', () => {
      const fixture = TestBed.createComponent(ListRutasComponent);
      const component = fixture.componentInstance;

      // Espía la llamada al método `unsubscribe` del suscriptor
      const unsubscribeSpy = spyOn(component['suscriptionNavBarService'], 'unsubscribe');
      // Llama al método ngOnDestroy
      component.ngOnDestroy();
      // Verifica si se llamó al método `unsubscribe`
      expect(unsubscribeSpy).toHaveBeenCalled();
    });

});