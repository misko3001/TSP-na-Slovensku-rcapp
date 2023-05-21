import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapResizeService {

  private resizeEvent: Subject<void> = new Subject<void>();

  constructor() {
  }

  public onMenuResize(): Observable<void> {
    return this.resizeEvent.asObservable();
  }

  public resizeMap(): void {
    this.resizeEvent.next();
  }
}
