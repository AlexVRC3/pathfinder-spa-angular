import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { By } from '@angular/platform-browser';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';
import { Subscription } from 'rxjs';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
      BrowserAnimationsModule, NoopAnimationsModule],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.formNavBar).toBeTruthy();
    expect(component.formNavBar).toBeInstanceOf(FormGroup); 
  });

  it('El formulario debería obtener el control "search"', () => {
    const searchControl = component.formNavBar.get('search');
    expect(searchControl).toBeTruthy();
    expect(searchControl?.value).toBe('');
  });

  it('Deberia llamarse al metodo submit cuando se hace click', () => {
    const button = fixture.debugElement.query(By.css('button'));
   
    spyOn(component, 'submit'); 
    button.nativeElement.click();
    fixture.detectChanges(); 

    expect(component.submit).toHaveBeenCalled();
  });
  
});
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navBarService: NavbarCommunicationService;
  let subscription: Subscription;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [NavbarComponent],
      providers: [NavbarCommunicationService]
    }).compileComponents();

    navBarService = TestBed.inject(NavbarCommunicationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    subscription = new Subscription();
    component["subscriptionNavbar"]= subscription;
    fixture.detectChanges();
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  it('should call submit method and set data in service', () => {
    const testData = 'Test search data';
    const searchControl = component.formNavBar.get('search');
    expect(searchControl).toBeTruthy();

    searchControl?.setValue(testData);
    spyOn(navBarService, 'setData');

    component.submit();

    expect(navBarService.setData).toHaveBeenCalledWith(testData);
  });

  it('should call cleanInput method and set empty data in service', () => {
    const EMPTY = '';
    const searchControl = component.formNavBar.get('search');
    expect(searchControl).toBeTruthy();

    searchControl?.setValue('Test data');
    spyOn(navBarService, 'setData');

    component.cleanInput();
    expect(navBarService.setData).toHaveBeenCalledWith(EMPTY);

    expect(searchControl?.value).toEqual(EMPTY);
  });

});

