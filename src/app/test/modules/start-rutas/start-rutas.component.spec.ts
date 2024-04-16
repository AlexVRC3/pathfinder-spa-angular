import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartRutasComponent } from '../../../modules/rutas/start-rutas/start-rutas.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('StartRutasComponent', () => {
  let component: StartRutasComponent;
  let fixture: ComponentFixture<StartRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartRutasComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //  it('should create', () => {
  //     expect(component).toBeTruthy();
  //   });
});
