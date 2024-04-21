import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Filter } from 'src/app/core/data/filters/filter.const';

@Injectable({
  providedIn: 'root'
})
export class NavbarCommunicationService {
  private _dataSubject: ReplaySubject<Filter> = new ReplaySubject<Filter>(1);
  private _activeSearchSubject: Subject<boolean> = new Subject<boolean>();

  setData(data: Filter): void {
    this._dataSubject.next(data);
  }

  setActiveSearch(active: boolean): void{
    this._activeSearchSubject.next(active);
  }

  $data(): Observable<Filter> {
    return this._dataSubject.asObservable();
  }

  $activeSearch(): Observable<boolean>{
    return this._activeSearchSubject.asObservable();
  }  

}