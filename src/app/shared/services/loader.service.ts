import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Loader } from '../model/loader.model';

@Injectable({
  providedIn: 'root'
})
export class LoaderCommunicationService {
  private handleLoader: Subject<Loader> = new Subject<Loader>();
  public handlerLoader$: Observable<Loader> = this.handleLoader.asObservable();

  showLoader(title ?: string): void {
    title = title || 'Cargando...';
    this.handleLoader.next({ show: true, title });
  }

  hideLoader(): void {
    this.handleLoader.next({ show: false, title: ''});
  }
}
