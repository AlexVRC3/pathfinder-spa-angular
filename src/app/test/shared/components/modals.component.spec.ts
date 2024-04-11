import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsComponent } from '../../../shared/components/modals/modals.component';

describe('ModalsComponent', () => {
  let component: ModalsComponent;
  let fixture: ComponentFixture<ModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
