import { Routes } from "@angular/router";
import { ListRutasComponent } from "./list-rutas/list-rutas.component";
import { DetalleRutasComponent } from "./detalle-rutas/detalle-rutas.component";

export const RUTAS_ROUTES: Routes = [
    { path: '', component: ListRutasComponent },
    { path: 'ruta/:id', component: DetalleRutasComponent },
    { path: '**', component: ListRutasComponent }
];