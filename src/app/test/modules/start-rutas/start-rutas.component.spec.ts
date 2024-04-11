import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRutasComponent } from '../../../modules/rutas/start-rutas/start-rutas.component';
import { ActivatedRoute } from '@angular/router';

describe('StartRutasComponent', () => {
  let component: StartRutasComponent;
  let fixture: ComponentFixture<StartRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartRutasComponent ],
      providers: [ActivatedRoute]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
