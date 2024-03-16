import {  NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ListRutasComponent } from './list-rutas/list-rutas.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';
import { DetalleRutasComponent } from './detalle-rutas/detalle-rutas.component';
import { MapaRutaComponent } from './detalle-rutas/mapa-ruta/mapa-ruta.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListRutasComponent,
    DetalleRutasComponent,
    MapaRutaComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    ListRutasComponent,
    DetalleRutasComponent
  ],
  providers: [NavbarCommunicationService]
})
export class RutasModule { }
