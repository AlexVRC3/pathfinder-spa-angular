import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavbarCommunicationService } from '../../services/navbar.service';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

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
  public enableSearch: boolean = true;
  public formNavBar: FormGroup = new FormGroup({
    'search': new FormControl('')
  });
  
  constructor(private navBarService: NavbarCommunicationService) {
    this.navBarService.setData('');
    this.subscriptionNavbar = this.navBarService.$activeSearch().subscribe((enable: boolean) => {
      this.enableSearch = enable;
    });
  }
  
  submit(): void {
    const data: string = this.formNavBar.get('search')?.value;
    this.navBarService.setData(data);
  }

  cleanInput(): void {
    const EMPTY: string = '';
    this.formNavBar.get('search')?.setValue(EMPTY);
    this.navBarService.setData(EMPTY);
  }

  ngOnDestroy(): void {
    this.subscriptionNavbar.unsubscribe();
  }

}
