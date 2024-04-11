import { Routes } from "@angular/router";
import { ListRutasComponent } from "./list-rutas/list-rutas.component";
import { DetalleRutasComponent } from "./detalle-rutas/detalle-rutas.component";
import { StartRutasComponent } from "./start-rutas/start-rutas.component";
import { AuthInitGuard } from "src/app/core/guards/auth-init.guard";

export const RUTAS_ROUTES: Routes = [
    { path: '', component: ListRutasComponent },
    { path: 'ruta', children: [
            {path: '', component: ListRutasComponent },
            {path: 'start', component: StartRutasComponent, canActivate: [ AuthInitGuard ] },
            {path: ':id', component: DetalleRutasComponent },
        ] 
    },
    { path: '**', component: ListRutasComponent }
];