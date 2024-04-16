import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_ROUTE } from 'src/app/core/data/cookie/start-cookie.interface';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let cookieService: CookieService;

  beforeEach(async () => {
    const cookieServiceStub = {
      get: () => '{"ruta": {"name": "Ruta de ejemplo"}}', // Proporciona un valor válido para la cookie
      delete: () => {},
      set: () => {}
    };

    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      imports: [ RouterTestingModule ],
      providers: [ { provide: CookieService, useValue: cookieServiceStub } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService); // Inyecta el servicio de cookies
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal', () => {
    spyOn(component["modalService"].$modal, 'emit'); // Espía el método emit de modalService.$modal
    component.closeModal();
    expect(component["modalService"].$modal.emit).toHaveBeenCalledWith(false); // Verifica que se llame a emit con false
  });

  it('should accept the route', () => {
    component.ruta = { id: 1, name: 'Ruta de ejemplo', ubicacion: 'Ubicacion de ejemplo', origenLatitud: 0, origenLongitud: 0, destinoLatitud: 1, destinoLongitud: 1 , image: " ", distanciaTotal: 0, duracionTotal: 0};
    spyOn(cookieService, 'delete');
    spyOn(cookieService, 'set');
    spyOn(component["router"], 'navigate');
    component.acceptRoute();
    expect(cookieService.delete).toHaveBeenCalledWith(COOKIE_ROUTE);
    expect(cookieService.set).toHaveBeenCalled();
    expect(component["router"].navigate).toHaveBeenCalledWith(['/ruta/start']);
  });
  
});
