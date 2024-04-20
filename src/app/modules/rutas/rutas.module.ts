import {  NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ListRutasComponent } from './list-rutas/list-rutas.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';
import { DetalleRutasComponent } from './detalle-rutas/detalle-rutas.component';
import { MapaRutaComponent } from './detalle-rutas/mapa-ruta/mapa-ruta.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StartRutasComponent } from './start-rutas/start-rutas.component';
import { ModalComponent } from './start-rutas/modal/modal.component';
import { ModalEndRouteCompleteComponent } from './start-rutas/modal-end-route-complete/modal-end-route-complete.component';

@NgModule({
  declarations: [
    ListRutasComponent,
    DetalleRutasComponent,
    MapaRutaComponent,
    StartRutasComponent,
    ModalComponent,
    ModalEndRouteCompleteComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    ListRutasComponent,
    DetalleRutasComponent,
    StartRutasComponent
  ],
  providers: [NavbarCommunicationService]
})
export class RutasModule { }
