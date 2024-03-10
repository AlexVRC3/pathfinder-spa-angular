import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RUTAS_ROUTES } from "./modules/rutas/rutas.routes";



@NgModule({
    imports: [ RouterModule.forRoot(RUTAS_ROUTES, {}) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{ }