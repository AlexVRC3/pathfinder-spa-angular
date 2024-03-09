import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderCommunicationService } from '../../services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let mockLoaderService: jasmine.SpyObj<LoaderCommunicationService>;
  let mockSpinnerService: jasmine.SpyObj<NgxSpinnerService>;
  let loaderServiceSpy: jasmine.Spy;
  
  beforeEach(() => {
    mockLoaderService = jasmine.createSpyObj('LoaderCommunicationService', ['showLoader', 'hideLoader']);
    mockSpinnerService = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);
    
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [
        { provide: LoaderCommunicationService, useValue: mockLoaderService },
        { provide: NgxSpinnerService, useValue: mockSpinnerService }
      ]
    });

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when service emits showLoader', () => {
    const mockLoaderData = { title: 'Loading', show: true };
    loaderServiceSpy = spyOnProperty(mockLoaderService, 'handlerLoader$', 'get').and.returnValue(of(mockLoaderData));
    
    fixture.detectChanges();

    expect(mockSpinnerService.show).toHaveBeenCalled();
    expect(component.message).toEqual(mockLoaderData.title);
  });

  it('should hide spinner when service emits hideLoader', () => {
    const mockLoaderData = { title: 'Loading', show: false };
    loaderServiceSpy = spyOnProperty(mockLoaderService, 'handlerLoader$', 'get').and.returnValue(of(mockLoaderData));

    fixture.detectChanges();

    expect(mockSpinnerService.hide).toHaveBeenCalled();
    expect(component.message).toEqual(mockLoaderData.title);
  });

  it('should unsubscribe from loader service on component destroy', () => {
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
