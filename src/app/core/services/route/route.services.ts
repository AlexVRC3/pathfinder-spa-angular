import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ruta } from '../../data/ruta.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import IRouteService from './route.interfaz';
import EnvironmentService from '../environment/env.service';
import { environment } from 'src/environments/environment';


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

  getListRoute(ubicacion: string): Observable<Ruta[]> {
    const url: string = this.envService.getUrl(this.RUTA.SEARCH);
    const params: HttpParams = new HttpParams()
                                    .set('ubicacion', ubicacion);
    return this.http.get<Ruta[]>(url, { params });
  }

}