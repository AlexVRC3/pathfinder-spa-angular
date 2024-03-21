
import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { RouteService } from "src/app/core/services/route/route.services";
import { ListRutasComponent } from "src/app/modules/rutas/list-rutas/list-rutas.component";
import { RutasModule } from "src/app/modules/rutas/rutas.module";
import { LoaderComponent } from "src/app/shared/components/loader/loader.component";
import { NavbarCommunicationService } from "src/app/shared/services/navbar.service";


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

      // Espía la llamada al método `unsubscribe` del suscriptor
      const unsubscribeSpy = spyOn(component['suscriptionNavBarService'], 'unsubscribe');
      // Llama al método ngOnDestroy
      component.ngOnDestroy();
      // Verifica si se llamó al método `unsubscribe`
      expect(unsubscribeSpy).toHaveBeenCalled();
    });

});