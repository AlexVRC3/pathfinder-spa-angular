import { Observable } from "rxjs";
import { Ruta } from "../../data/ruta.interface";

export default interface IRouteService {
    getListRoute(name: string): Observable<Ruta[]>;
}