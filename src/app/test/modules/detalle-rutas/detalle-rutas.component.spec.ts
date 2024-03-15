import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router'; 
import { DetalleRutasComponent } from '../../../modules/rutas/detalle-rutas/detalle-rutas.component';
import { HttpClientModule } from '@angular/common/http'; 

describe('DetalleRutasComponent', () => {
  let component: DetalleRutasComponent;
  let fixture: ComponentFixture<DetalleRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleRutasComponent ],
      imports: [HttpClientModule], 
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { 
            paramMap: {
              subscribe: (fn: any) => fn({ get: (key: string) => '1' }) 
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
