import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
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
