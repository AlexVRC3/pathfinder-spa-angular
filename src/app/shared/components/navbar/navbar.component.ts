import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavbarCommunicationService } from '../../services/navbar.service';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { Filter, INIT_FILTER_EMPTY, MINIMUN_FILTER } from 'src/app/core/data/filters/filter.const';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger(
      'triggerFade', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class NavbarComponent implements OnDestroy {
  private subscriptionNavbar: Subscription;
  public readonly FILTER_DISTANCE: number = MINIMUN_FILTER;
  public enableSearch: boolean = true;
  public formNavBar: FormGroup = new FormGroup({
    'search': new FormControl(''),
    'distanceFilter': new FormControl(this.FILTER_DISTANCE),
    'filterType': new FormControl('')
  });  
  @ViewChild('filterDiv') filterDiv !: ElementRef;
  
  constructor(private navBarService: NavbarCommunicationService) {
    this.navBarService.setData(INIT_FILTER_EMPTY);
    this.subscriptionNavbar = this.navBarService.$activeSearch().subscribe((enable: boolean) => {
      this.enableSearch = enable;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if(this.filterDiv == undefined)
      return;

    if (this.filterDiv.nativeElement.contains(event.target))
        return;

    const target = event.target as HTMLElement;
    if ( this.formNavBar.get('filterType')?.value === 'filter-distancia' && target.nodeName === 'SELECT') 
      return;
    
    this.formNavBar.get('filterType')?.setValue('');
  
  }
  
  submit(): void {
    const search: string = this.formNavBar.get('search')?.value;
    const distance: number = this.formNavBar.get('distanceFilter')?.value;
    this.formNavBar.get('filterType')?.setValue('');
    const filter: Filter = { distance, search };
    this.navBarService.setData(filter);
  }

  cleanInput(): void {
    const EMPTY: string = '';
    this.formNavBar.get('search')?.setValue(EMPTY);
    this.formNavBar.get('distanceFilter')?.setValue(this.FILTER_DISTANCE);
    this.formNavBar.get('filterType')?.setValue(EMPTY);
    this.navBarService.setData(INIT_FILTER_EMPTY);
  }

  ngOnDestroy(): void {
    this.subscriptionNavbar.unsubscribe();
  }

  count(n: number): void {
    let currentValue: number = this.formNavBar.get('distanceFilter')?.value;
    const sum: number = currentValue + n;
    if (1 <= sum && sum <= this.FILTER_DISTANCE) {
      this.formNavBar.get('distanceFilter')?.setValue(sum);
    }
  }

}
