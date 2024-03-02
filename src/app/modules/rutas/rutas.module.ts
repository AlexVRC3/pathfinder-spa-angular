import {  NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ListRutasComponent } from './list-rutas/list-rutas.component';
import { TranslateModule } from '@ngx-translate/core';

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
  providers: []
})
export class RutasModule { }
