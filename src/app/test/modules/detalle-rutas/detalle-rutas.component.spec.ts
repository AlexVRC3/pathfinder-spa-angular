import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleRutasComponent } from '../../../modules/rutas/detalle-rutas/detalle-rutas.component';
import { HttpClientModule } from '@angular/common/http'; 
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';
import { RouteService } from 'src/app/core/services/route/route.services';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';


describe('DetalleRutasComponent', () => {
  let component: DetalleRutasComponent;
  let fixture: ComponentFixture<DetalleRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleRutasComponent ],
      imports: [HttpClientModule, RouterTestingModule, TranslateModule.forRoot()], 
      providers: [
        NavbarCommunicationService,
        RouteService
      ]
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(DetalleRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Deberia actualizar los atributos cuando rutaservice es llamado-1', () => {
    //Completar 
    let service=TestBed.inject(RouteService);    
    // Espiar el método getRuta y proporcionar una implementación falsa
    spyOn(service, "getRuta").and.callFake((_id: number) => {
      // Simular la respuesta del servicio con un objeto de ruta
      
      return of({
        id: 1,
        name: "ruta1",
        ubicacion: "El Escorial",
        origenLatitud: 45.21313,
        origenLongitud: -1.13134,
        destinoLatitud: 6.32314,
        destinoLongitud: 18.31342,
        distanciaTotal: 135,
        duracionTotal:120
      });
    });

    fixture = TestBed.createComponent(DetalleRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
   
    expect(component.existRuta).toBeTrue();
    expect(component.ruta).toEqual({
      id: 1,
      name: "ruta1",
      ubicacion: "El Escorial",
      origenLatitud: 45.21313,
      origenLongitud: -1.13134,
      destinoLatitud: 6.32314,
      destinoLongitud: 18.31342,
      distanciaTotal: 135,
      duracionTotal:120
    });
    
  })

  it('should unsubscribe from navbarService subscription when ngOnDestroy is called', () => {
    fixture = TestBed.createComponent(DetalleRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const unsubscribeSpy = spyOn(component['suscriptionRutaService'], 'unsubscribe');
    // Llama al método ngOnDestroy
    component.ngOnDestroy();
    // Verifica si se llamó al método `unsubscribe`
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
  
  it('should unsubscribe from RutaService subscription when ngOnDestroy is called', () => {
    fixture = TestBed.createComponent(DetalleRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const unsubscribeSpy = spyOn(component['suscriptionRutaService'], 'unsubscribe');
    // Llama al método ngOnDestroy
    component.ngOnDestroy();
    // Verifica si se llamó al método `unsubscribe`
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('Deberia mostrar la distancia total de la ruta', () => {
    //Completar 
    let service=TestBed.inject(RouteService);    
    // Espiar el método getRuta y proporcionar una implementación falsa
    spyOn(service, "getRuta").and.callFake((_id: number) => {
      // Simular la respuesta del servicio con un objeto de ruta
      
      return of({
        id: 1,
        name: "ruta1",
        ubicacion: "El Escorial",
        origenLatitud: 45.21313,
        origenLongitud: -1.13134,
        destinoLatitud: 6.32314,
        destinoLongitud: 18.31342,
        distanciaTotal: 135,
        duracionTotal:120
      });
    });

    fixture = TestBed.createComponent(DetalleRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
   
    expect(component.existRuta).toBeTrue();
    expect(component.ruta).toEqual({
      id: 1,
      name: "ruta1",
      ubicacion: "El Escorial",
      origenLatitud: 45.21313,
      origenLongitud: -1.13134,
      destinoLatitud: 6.32314,
      destinoLongitud: 18.31342,
      distanciaTotal: 135,
      duracionTotal:120
    });
    // Define la distancia que esperas mostrar
    const expectedDistance = '135 km';
      
    // Obtiene el elemento HTML que contiene el texto de la distancia
    const distanciaElement: HTMLElement = fixture.nativeElement.querySelector('.distancia');

    // Verifica si el texto del elemento coincide con el texto esperado
    expect(distanciaElement.textContent!.trim()).toBe(expectedDistance);
    
  })
  it('Deberia mostrar la duracion total de la ruta', () => {
    //Completar 
    let service=TestBed.inject(RouteService);    
    // Espiar el método getRuta y proporcionar una implementación falsa
    spyOn(service, "getRuta").and.callFake((_id: number) => {
      // Simular la respuesta del servicio con un objeto de ruta
      
      return of({
        id: 1,
        name: "ruta1",
        ubicacion: "El Escorial",
        origenLatitud: 45.21313,
        origenLongitud: -1.13134,
        destinoLatitud: 6.32314,
        destinoLongitud: 18.31342,
        distanciaTotal: 135,
        duracionTotal:120
      });
    });

    fixture = TestBed.createComponent(DetalleRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
   
    expect(component.existRuta).toBeTrue();
    expect(component.ruta).toEqual({
      id: 1,
      name: "ruta1",
      ubicacion: "El Escorial",
      origenLatitud: 45.21313,
      origenLongitud: -1.13134,
      destinoLatitud: 6.32314,
      destinoLongitud: 18.31342,
      distanciaTotal: 135,
      duracionTotal:120
    });
    // Define la duración que esperas mostrar
  const expectedDuration = '2 horas y 0 minutos';

  // Obtiene el elemento HTML que contiene el texto de la duración
  const duracionElement: HTMLElement = fixture.nativeElement.querySelector('.duracion');

  // Verifica si el texto del elemento coincide con el texto esperado
  expect(duracionElement.textContent!.trim()).toContain(expectedDuration);
    
  })

  it('should not throw an error if navbarService subscription is not defined when ngOnDestroy is called', () => {
    fixture = TestBed.createComponent(DetalleRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(() => {
      component.ngOnDestroy();
    }).not.toThrow();
  });
  
});


