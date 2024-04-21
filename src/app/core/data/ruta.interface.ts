export class Ruta {
    id: number;
    name: string;
    ubicacion: string;
    origenLatitud: number;
    origenLongitud: number;
    destinoLatitud: number;
    destinoLongitud: number;
    image: string;
    distanciaTotal: number;
    duracionTotal: number;

    constructor(
        id: number,
        name: string,
        ubicacion: string,
        origenLatitud: number,
        origenLongitud: number,
        destinoLatitud: number,
        destinoLongitud: number,
        image: string,
        distanciaTotal: number = 0,
        duracionTotal: number = 0
    ) {
        this.id = id;
        this.name = name;
        this.ubicacion = ubicacion;
        this.origenLatitud = origenLatitud;
        this.origenLongitud = origenLongitud;
        this.destinoLatitud = destinoLatitud;
        this.destinoLongitud = destinoLongitud;
        this.image = image;
        this.distanciaTotal = distanciaTotal;
        this.duracionTotal = duracionTotal;
    }
};