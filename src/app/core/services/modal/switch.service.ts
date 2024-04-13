import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  constructor() {}
  $modal = new EventEmitter<boolean>(false);
}
