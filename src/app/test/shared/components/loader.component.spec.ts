
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { LoaderComponent } from "src/app/shared/components/loader/loader.component";
import { Loader } from "src/app/shared/model/loader.model";
import { LoaderCommunicationService } from "src/app/shared/services/loader.service";
import { SharedModule } from "src/app/shared/shared.module";


describe('LoaderComponent', () => {
    const loaderServiceSpy: jasmine.SpyObj<LoaderCommunicationService> = jasmine.createSpyObj('loaderService', ['showLoader', 'hideLoader']);
    const ngxSpinnerSpy: jasmine.SpyObj<NgxSpinnerService> = jasmine.createSpyObj('spinnerService', ['show', 'hide']);
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            SharedModule
        ],
        declarations: [LoaderComponent],
        providers: [
            { provide: LoaderCommunicationService, useVale: loaderServiceSpy },
            { provide: NgxSpinnerService, useVale: ngxSpinnerSpy }
        ]
      });
    });
  
    it('should create', () => {
      const fixture = TestBed.createComponent(LoaderComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should unsubscribe from loader service on component destroy', () => {
      const fixture = TestBed.createComponent(LoaderComponent);
      const component = fixture.componentInstance;
      spyOn(component.subscription, 'unsubscribe');
  
      component.ngOnDestroy();
  
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });


});

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderCommunicationService;
  let ngxSpinnerService: NgxSpinnerService;
  let subscription: Subscription;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LoaderComponent],
      providers: [
        LoaderCommunicationService,
        NgxSpinnerService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderCommunicationService);
    ngxSpinnerService = TestBed.inject(NgxSpinnerService);
    subscription = new Subscription();
    component.subscription = subscription;
    fixture.detectChanges();
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  it('should update message when loader data changes', () => {
    const testData: Loader = {
      show: true,
      title: 'Loading...'
    };
  
    spyOn(loaderService, 'showLoader').and.callThrough();
    loaderService.showLoader(testData.title);
  
    expect(component.message).toEqual(testData.title);
  
    spyOn(ngxSpinnerService, 'show');
  
  });
  
  it('should hide spinner when loader data show is false', () => {
    const testData: Loader = {
      show: false,
      title: 'Loading...'
    };
  
    spyOn(loaderService, 'hideLoader').and.callThrough();
    loaderService.hideLoader();
  
    expect(component.message).toEqual('');
  
    spyOn(ngxSpinnerService, 'hide');
  
  });
});


