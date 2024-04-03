import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarCommunicationService {
  private _dataSubject: ReplaySubject<string> = new ReplaySubject<string>(1);
  private _activeSearchSubject: Subject<boolean> = new Subject<boolean>();

  setData(data: string): void {
    this._dataSubject.next(data);
  }

  setActiveSearch(active: boolean): void{
    this._activeSearchSubject.next(active);
  }

  $data(): Observable<string> {
    return this._dataSubject.asObservable();
  }

  $activeSearch(): Observable<boolean>{
    return this._activeSearchSubject.asObservable();
  }  

}