
import { TestBed } from "@angular/core/testing";
import { NgxSpinnerService } from "ngx-spinner";

import { LoaderComponent } from "src/app/shared/components/loader/loader.component";
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