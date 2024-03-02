import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderCommunicationService } from '../../services/loader.service';
import { Loader } from '../../model/loader.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnDestroy{

  @Input() message: string = '';
  public subscription: Subscription;

  constructor(private loaderService: LoaderCommunicationService, private spinnerService: NgxSpinnerService) {
    this.subscription = this.loaderService.handlerLoader$.subscribe( (data: Loader) => {
      this.message = data.title;
      if (data.show) 
        this.spinnerService.show();
      else
        this.spinnerService.hide();
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
