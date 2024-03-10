import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavbarCommunicationService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public formNavBar: FormGroup = new FormGroup({
    'search': new FormControl('')
  });
  
  constructor(private navBarService: NavbarCommunicationService) {
    this.navBarService.setData('');
  }
  
  submit(): void {
    const data: string = this.formNavBar.get('search')?.value;
    this.navBarService.setData(data);
  }

}
