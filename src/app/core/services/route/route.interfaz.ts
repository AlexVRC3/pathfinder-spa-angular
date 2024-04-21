import { Observable } from "rxjs";
import { Ruta } from "../../data/ruta.interface";
import { Filter } from "../../data/filters/filter.const";

export default interface IRouteService {
    getListRoute(filter: Filter): Observable<Ruta[]>;
    getRuta(id: number): Observable<Ruta>;
}