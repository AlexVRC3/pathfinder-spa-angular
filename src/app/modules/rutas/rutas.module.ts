import {  NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ListRutasComponent } from './list-rutas/list-rutas.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';
import { DetalleRutasComponent } from './detalle-rutas/detalle-rutas.component';
import { MapaRutaComponent } from './detalle-rutas/mapa-ruta/mapa-ruta.component';

@NgModule({
  declarations: [
    ListRutasComponent,
    DetalleRutasComponent,
    MapaRutaComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports:[
    ListRutasComponent,
    DetalleRutasComponent
  ],
  providers: [NavbarCommunicationService]
})
export class RutasModule { }
