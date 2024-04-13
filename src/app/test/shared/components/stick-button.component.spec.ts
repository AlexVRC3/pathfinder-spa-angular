import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickButtonComponent } from '../../../shared/components/stick-button/stick-button.component';

describe('StickButtonComponent', () => {
  let component: StickButtonComponent;
  let fixture: ComponentFixture<StickButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
