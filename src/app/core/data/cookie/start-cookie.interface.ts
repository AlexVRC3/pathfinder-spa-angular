import { Ruta } from "../ruta.interface";

export interface StartRouteCookie {
    init: boolean;
    ruta: Ruta | null;
}

export const COOKIE_ROUTE: string = "start-route";