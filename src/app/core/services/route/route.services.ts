import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
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

  getListRoute(name: string): Observable<Ruta[]> {
    const url: string = this.envService.getUrl(this.RUTA.SEARCH);
    const params: HttpParams = new HttpParams()
                                    .set('name', name);
    return this.http.get<Ruta[]>(url, { params });
  }

}