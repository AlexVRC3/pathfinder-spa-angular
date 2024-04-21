import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEndRouteCompleteComponent } from './modal-end-route-complete.component';

describe('ModalEndRouteCompleteComponent', () => {
  let component: ModalEndRouteCompleteComponent;
  let fixture: ComponentFixture<ModalEndRouteCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEndRouteCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEndRouteCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
