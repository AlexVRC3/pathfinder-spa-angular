import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RUTAS_ROUTES } from "./modules/rutas/rutas.routes";
import { RutasModule } from "./modules/rutas/rutas.module";

@NgModule({
    imports: [ RouterModule.forRoot(RUTAS_ROUTES, {}),
    RutasModule
 ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{ }