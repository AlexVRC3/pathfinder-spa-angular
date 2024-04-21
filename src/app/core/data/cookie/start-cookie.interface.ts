export interface StartRouteCookie {
    init: boolean;
    ruta: RutaCookie | null;
}

export interface RutaCookie {
    id: number;
    name: string;
    ubicacion: string;
    origenLatitud: number;
    origenLongitud: number;
    destinoLatitud: number;
    destinoLongitud: number;
}


export const COOKIE_ROUTE: string = "start-route";