import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StickButtonCommunicationService {
  private _activeIconStickySubject: Subject<boolean> = new Subject<boolean>();
  
  setActiveSticky(active: boolean): void {
    this._activeIconStickySubject.next(active);
  }

  $activeSticky(): Observable<boolean>{
    return this._activeIconStickySubject.asObservable();
  }

}