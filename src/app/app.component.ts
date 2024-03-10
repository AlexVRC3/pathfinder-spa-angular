import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pathfinder';
  constructor(private readonly translateService: TranslateService){
    const userLang:string = navigator.language || 'es';
    const languageCode:string = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
  }
}
