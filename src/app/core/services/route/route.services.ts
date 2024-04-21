import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ruta } from '../../data/ruta.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import IRouteService from './route.interfaz';
import EnvironmentService from '../environment/env.service';
import { environment } from 'src/environments/environment';
import { Filter } from '../../data/filters/filter.const';


@Injectable({
  providedIn: 'root'
})
export class RouteService implements IRouteService {
  private readonly RUTA = environment.PATH.RUTA;
  constructor(private http: HttpClient, private envService: EnvironmentService){}
  
  getRuta(id: number): Observable<Ruta> {
    const url: string = `${this.envService.getUrl(this.RUTA.GET)}/${id}`;
    return this.http.get<Ruta>(url);
  }

  getListRoute(filter: Filter): Observable<Ruta[]> {
    const url: string = this.envService.getUrl(this.RUTA.SEARCH);
    console.log(filter)
    const params: HttpParams = new HttpParams()
                                    .set('ubicacion', filter.search)
                                    .set('distanciaTotal', filter.distance);
    return this.http.get<Ruta[]>(url, { params });
  }

}