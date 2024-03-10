import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarCommunicationService {
  private _dataSubject: ReplaySubject<string> = new ReplaySubject<string>(1);
  
  setData(data: string): void {
    this._dataSubject.next(data);
  }

  $data(): Observable<string> {
    return this._dataSubject.asObservable();
  }

}