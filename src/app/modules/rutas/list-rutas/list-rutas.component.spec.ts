import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRutasComponent } from './list-rutas.component';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';
import { RouteService } from 'src/app/core/services/route/route.services';
import { of } from 'rxjs';
import { Ruta } from 'src/app/core/data/ruta.interface';

describe('ListRutasComponent', () => {
  let component: ListRutasComponent;
  let fixture: ComponentFixture<ListRutasComponent>;
  let mockNavBarService: jasmine.SpyObj<NavbarCommunicationService>;
  let mockRouteService: jasmine.SpyObj<RouteService>;

  beforeEach(async () => {
    mockNavBarService = jasmine.createSpyObj('NavbarCommunicationService', ['setData', '$data']);
    mockRouteService = jasmine.createSpyObj('RouteService', ['getListRoute']);
    
    await TestBed.configureTestingModule({
      declarations: [ListRutasComponent],
      providers: [
        { provide: NavbarCommunicationService, useValue: mockNavBarService },
        { provide: RouteService, useValue: mockRouteService }
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRutasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud set foundUser to true and listRutas with data when subscription returns data', () => {
    const mockRutas: Ruta[] = [
      { id: 1, name: 'Ruta 1', ubicacion: 'Ubicación 1' },
      { id: 2, name: 'Ruta 2', ubicacion: 'Ubicación 2' }
    ];
    mockNavBarService.$data.and.returnValue(of("Input"));
    mockRouteService.getListRoute.and.returnValue(of(mockRutas));

    fixture.detectChanges();

    expect(component.foundRuta).toBeTrue();
    expect(component.listRutas).toEqual(mockRutas);
  });


  it('should set foundRuta to false when subscription returns empty data', () => {
    // Simula el servicio de comunicación del navbar para devolver datos vacíos
    mockNavBarService.$data.and.returnValue(of("Input"));
    // Simula el servicio de ruta para devolver una lista vacía
    mockRouteService.getListRoute.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.foundRuta).toBeFalse();
  });

  it('should unsubscribe from subscriptions onDestroy', () => {
    // Espía la llamada al método `unsubscribe` del suscriptor
    const unsubscribeSpy = spyOn(component['suscriptionNavBarService'], 'unsubscribe');
    // Llama al método ngOnDestroy
    component.ngOnDestroy();
    // Verifica si se llamó al método `unsubscribe`
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});