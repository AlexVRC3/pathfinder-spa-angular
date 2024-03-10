import {  NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ListRutasComponent } from './list-rutas/list-rutas.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';

@NgModule({
  declarations: [
    ListRutasComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports:[
    ListRutasComponent
  ],
  providers: [NavbarCommunicationService]
})
export class RutasModule { }
