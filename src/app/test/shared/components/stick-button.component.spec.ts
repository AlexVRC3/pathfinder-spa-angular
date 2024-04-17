import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StickButtonComponent } from '../../../shared/components/stick-button/stick-button.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { StickButtonCommunicationService } from '../../../shared/services/stick-button.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StickButtonComponent', () => {
  let component: StickButtonComponent;
  let fixture: ComponentFixture<StickButtonComponent>;
  let cookieService: CookieService;
  let stickButtonCommsService: StickButtonCommunicationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickButtonComponent ],
      imports: [ RouterTestingModule, BrowserAnimationsModule ],
      providers: [ CookieService, StickButtonCommunicationService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickButtonComponent);
    component = fixture.componentInstance;
  
    // Mock CookieService
    cookieService = TestBed.inject(CookieService);
    spyOn(cookieService, 'check').and.returnValue(true);
    spyOn(cookieService, 'get').and.returnValue('{"init": true}');
  
    // Mock StickButtonCommunicationService
    stickButtonCommsService = TestBed.inject(StickButtonCommunicationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to init route', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.redirectInitRoute();

    expect(navigateSpy).toHaveBeenCalledWith(['/ruta/start']);
  });

  it('should unsubscribe from subscription on ngOnDestroy', () => {
    spyOn(component["subscriptionStickService"], 'unsubscribe');
    component.ngOnDestroy();
    expect(component["subscriptionStickService"].unsubscribe).toHaveBeenCalled();
  });
});
