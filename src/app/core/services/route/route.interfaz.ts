import { Observable } from "rxjs";
import { Ruta } from "../../data/ruta.interface";

export default interface IRouteService {
    getListRoute(ubicacion: string): Observable<Ruta[]>;
    getRuta(id: number): Observable<Ruta>;
}