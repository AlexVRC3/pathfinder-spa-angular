import { Component, OnDestroy } from '@angular/core';
import { StickButtonCommunicationService } from '../../services/stick-button.service';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_ROUTE, StartRouteCookie } from 'src/app/core/data/cookie/start-cookie.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-stick-button',
  templateUrl: './stick-button.component.html',
  styleUrls: ['./stick-button.component.css'],
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
  ]
})
export class StickButtonComponent implements OnDestroy {
  public isActiveIcon: boolean = false;
  private subscriptionStickService: Subscription;
  constructor(private readonly stickButtonCommsService: StickButtonCommunicationService, private readonly cookieService: CookieService, private readonly router: Router) {
    this.isActiveIcon = this.cookieService.check(COOKIE_ROUTE) && (JSON.parse(this.cookieService.get(COOKIE_ROUTE)) as StartRouteCookie).init;
    this.stickButtonCommsService.setActiveSticky(this.isActiveIcon);
    this.subscriptionStickService = this.stickButtonCommsService.$activeSticky().subscribe((isActive: boolean) => this.isActiveIcon = isActive);
  }

  public redirectInitRoute(): void {
    this.router.navigate(['/ruta/start']);
    this.stickButtonCommsService.setActiveSticky(true);
  }
  

  ngOnDestroy(): void {
    this.subscriptionStickService.unsubscribe();
  }
}
